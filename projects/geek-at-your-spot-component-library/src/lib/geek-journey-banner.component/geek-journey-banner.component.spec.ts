import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekJourneyBannerComponent } from './geek-journey-banner.component';

describe('GeekJourneyBannerComponent', () => {
  let component: GeekJourneyBannerComponent;
  let fixture: ComponentFixture<GeekJourneyBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeekJourneyBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeekJourneyBannerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
