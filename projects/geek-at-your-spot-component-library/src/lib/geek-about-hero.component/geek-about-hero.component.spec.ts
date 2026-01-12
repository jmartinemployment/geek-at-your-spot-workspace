import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekAboutHeroComponent } from './geek-about-hero.component';

describe('GeekAboutHeroComponent', () => {
  let component: GeekAboutHeroComponent;
  let fixture: ComponentFixture<GeekAboutHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeekAboutHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeekAboutHeroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
