import { Component, signal, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-geek-pong',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './geek-pong.component.html',
  styleUrls: ['./geek-pong.component.css']
})
export class GeekPongComponent implements OnDestroy {
  // Canvas dimensions
  canvasWidth = 800;
  canvasHeight = 600;
  
  // Game state
  score = signal(0);
  highScore = signal(0);
  gameActive = signal(false);
  gameOver = signal(false);
  
  // Ball
  ballX = signal(400);
  ballY = signal(300);
  ballSpeedX = 5;
  ballSpeedY = 5;
  ballSize = 10;
  
  // Paddle
  paddleX = signal(350);
  paddleY = 550;
  paddleWidth = 100;
  paddleHeight = 15;
  
  // Animation frame
  private animationId?: number;
  
  constructor() {
    // Load high score from localStorage
    const saved = localStorage.getItem('geek-pong-high-score');
    if (saved) {
      this.highScore.set(parseInt(saved, 10));
    }
  }

  startGame(): void {
    this.score.set(0);
    this.gameOver.set(false);
    this.gameActive.set(true);
    this.ballX.set(400);
    this.ballY.set(300);
    this.ballSpeedX = 5;
    this.ballSpeedY = 5;
    this.gameLoop();
  }

  gameLoop(): void {
    if (!this.gameActive()) return;

    // Move ball
    this.ballX.update(x => x + this.ballSpeedX);
    this.ballY.update(y => y + this.ballSpeedY);

    // Ball collision with walls
    if (this.ballX() <= 0 || this.ballX() >= this.canvasWidth - this.ballSize) {
      this.ballSpeedX = -this.ballSpeedX;
    }
    if (this.ballY() <= 0) {
      this.ballSpeedY = -this.ballSpeedY;
    }

    // Ball collision with paddle
    if (
      this.ballY() + this.ballSize >= this.paddleY &&
      this.ballX() >= this.paddleX() &&
      this.ballX() <= this.paddleX() + this.paddleWidth
    ) {
      this.ballSpeedY = -this.ballSpeedY;
      this.score.update(s => s + 1);
      
      // Increase difficulty
      if (this.score() % 5 === 0) {
        this.ballSpeedX *= 1.1;
        this.ballSpeedY *= 1.1;
      }
    }

    // Ball missed paddle - game over
    if (this.ballY() >= this.canvasHeight) {
      this.endGame();
      return;
    }

    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }

  endGame(): void {
    this.gameActive.set(false);
    this.gameOver.set(true);
    
    // Update high score
    if (this.score() > this.highScore()) {
      this.highScore.set(this.score());
      localStorage.setItem('geek-pong-high-score', this.score().toString());
    }
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  movePaddle(event: MouseEvent): void {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const newX = Math.max(0, Math.min(x - this.paddleWidth / 2, this.canvasWidth - this.paddleWidth));
    this.paddleX.set(newX);
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
