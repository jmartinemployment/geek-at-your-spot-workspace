import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeekHomeHeroComponent } from './geek-home-hero.component';

describe('GeekHomeHeroComponent', () => {
  let component: GeekHomeHeroComponent;
  let fixture: ComponentFixture<GeekHomeHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeekHomeHeroComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GeekHomeHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have headline signal with default value', () => {
    expect(component.headline()).toBe('Your competitors are using AI.');
  });

  it('should have CTA text signal', () => {
    expect(component.ctaText()).toBe('Get Your Free AI Assessment');
  });
});
