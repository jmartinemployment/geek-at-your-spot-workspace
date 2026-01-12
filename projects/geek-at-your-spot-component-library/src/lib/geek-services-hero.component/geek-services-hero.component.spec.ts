import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekServicesHeroComponent } from './geek-services-hero.component';

describe('GeekServicesHeroComponent', () => {
  let component: GeekServicesHeroComponent;
  let fixture: ComponentFixture<GeekServicesHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeekServicesHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeekServicesHeroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
