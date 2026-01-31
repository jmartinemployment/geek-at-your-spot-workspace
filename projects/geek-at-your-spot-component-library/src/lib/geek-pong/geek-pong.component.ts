import {
  Component,
  signal,
  computed,
  OnDestroy,
  OnInit,
  ElementRef,
  inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'lib-geek-pong',
  imports: [CommonModule],
  templateUrl: './geek-pong.component.html',
  styleUrls: ['./geek-pong.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeekPongComponent implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  // Base canvas dimensions (used for viewBox - game logic works in these coordinates)
  readonly baseWidth = 800;
  readonly baseHeight = 600;

  // Actual display dimensions (responsive)
  containerWidth = signal(800);

  // Computed aspect ratio height
  displayHeight = computed(() => (this.containerWidth() * this.baseHeight) / this.baseWidth);

  // Game state
  score = signal(0);
  highScore = signal(0);
  gameActive = signal(false);
  gameOver = signal(false);

  // Ball position (in base coordinates)
  ballX = signal(400);
  ballY = signal(300);
  private ballSpeedX = 5;
  private ballSpeedY = 5;
  private readonly baseBallSpeed = 5;
  readonly ballSize = 15;

  // Paddle (in base coordinates)
  paddleX = signal(350);
  readonly paddleY = 550;
  readonly paddleWidth = 140;
  readonly paddleHeight = 20;

  // Animation frame
  private animationId?: number;
  private resizeObserver?: ResizeObserver;

  // Touch tracking
  private lastTouchX = 0;

  constructor() {
    // Load high score from localStorage
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('geek-pong-high-score');
      if (saved) {
        this.highScore.set(parseInt(saved, 10));
      }
    }
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Set up resize observer for responsive canvas
    this.setupResizeObserver();
  }

  private setupResizeObserver(): void {
    const container = this.elementRef.nativeElement.querySelector('.game-canvas-wrapper');
    if (!container) return;

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = Math.min(entry.contentRect.width - 20, 800);
        this.containerWidth.set(Math.max(width, 280));
      }
    });

    this.resizeObserver.observe(container);
  }

  startGame(): void {
    this.score.set(0);
    this.gameOver.set(false);
    this.gameActive.set(true);
    this.ballX.set(this.baseWidth / 2);
    this.ballY.set(this.baseHeight / 2);
    this.ballSpeedX = this.baseBallSpeed * (Math.random() > 0.5 ? 1 : -1);
    this.ballSpeedY = this.baseBallSpeed;
    this.paddleX.set((this.baseWidth - this.paddleWidth) / 2);
    this.gameLoop();
  }

  private gameLoop(): void {
    if (!this.gameActive()) return;

    // Move ball
    this.ballX.update((x) => x + this.ballSpeedX);
    this.ballY.update((y) => y + this.ballSpeedY);

    // Ball collision with left/right walls
    if (this.ballX() <= this.ballSize / 2) {
      this.ballX.set(this.ballSize / 2);
      this.ballSpeedX = Math.abs(this.ballSpeedX);
    }
    if (this.ballX() >= this.baseWidth - this.ballSize / 2) {
      this.ballX.set(this.baseWidth - this.ballSize / 2);
      this.ballSpeedX = -Math.abs(this.ballSpeedX);
    }

    // Ball collision with top wall
    if (this.ballY() <= this.ballSize / 2) {
      this.ballY.set(this.ballSize / 2);
      this.ballSpeedY = Math.abs(this.ballSpeedY);
    }

    // Ball collision with paddle
    const ballBottom = this.ballY() + this.ballSize / 2;
    const paddleTop = this.paddleY;
    const paddleLeft = this.paddleX();
    const paddleRight = this.paddleX() + this.paddleWidth;

    if (
      ballBottom >= paddleTop &&
      ballBottom <= paddleTop + this.paddleHeight &&
      this.ballX() >= paddleLeft &&
      this.ballX() <= paddleRight &&
      this.ballSpeedY > 0
    ) {
      this.ballSpeedY = -Math.abs(this.ballSpeedY);
      this.score.update((s) => s + 1);

      // Add angle based on where ball hits paddle
      const hitPos = (this.ballX() - paddleLeft) / this.paddleWidth;
      this.ballSpeedX = (hitPos - 0.5) * 10;

      // Increase difficulty every 5 points
      if (this.score() % 5 === 0) {
        const speedMultiplier = 1.1;
        this.ballSpeedX *= speedMultiplier;
        this.ballSpeedY *= speedMultiplier;
      }
    }

    // Ball missed paddle - game over
    if (this.ballY() >= this.baseHeight + this.ballSize) {
      this.endGame();
      return;
    }

    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }

  private endGame(): void {
    this.gameActive.set(false);
    this.gameOver.set(true);

    // Update high score
    if (this.score() > this.highScore()) {
      this.highScore.set(this.score());
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('geek-pong-high-score', this.score().toString());
      }
    }

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  // Mouse control
  movePaddle(event: MouseEvent): void {
    if (!this.gameActive()) return;

    const svg = event.currentTarget as SVGSVGElement;
    const rect = svg.getBoundingClientRect();
    const scaleX = this.baseWidth / rect.width;

    const mouseX = (event.clientX - rect.left) * scaleX;
    this.updatePaddlePosition(mouseX);
  }

  // Touch controls
  onTouchStart(event: TouchEvent): void {
    if (event.touches.length > 0) {
      const svg = event.currentTarget as SVGSVGElement;
      const rect = svg.getBoundingClientRect();
      const scaleX = this.baseWidth / rect.width;
      this.lastTouchX = (event.touches[0].clientX - rect.left) * scaleX;
    }
  }

  onTouchMove(event: TouchEvent): void {
    event.preventDefault(); // Prevent scrolling while playing

    if (!this.gameActive() || event.touches.length === 0) return;

    const svg = event.currentTarget as SVGSVGElement;
    const rect = svg.getBoundingClientRect();
    const scaleX = this.baseWidth / rect.width;

    const touchX = (event.touches[0].clientX - rect.left) * scaleX;
    this.updatePaddlePosition(touchX);
    this.lastTouchX = touchX;
  }

  private updatePaddlePosition(x: number): void {
    const newX = Math.max(0, Math.min(x - this.paddleWidth / 2, this.baseWidth - this.paddleWidth));
    this.paddleX.set(newX);
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
