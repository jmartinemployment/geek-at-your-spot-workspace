import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekFrontPageHeroComponent } from './geek-front-page-hero.component';

describe('GeekFrontPageHeroComponent', () => {
  let component: GeekFrontPageHeroComponent;
  let fixture: ComponentFixture<GeekFrontPageHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeekFrontPageHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeekFrontPageHeroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
