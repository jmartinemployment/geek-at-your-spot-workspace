import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekMissionBannerComponent } from './geek-mission-banner.component';

describe('GeekMissionBannerComponent', () => {
  let component: GeekMissionBannerComponent;
  let fixture: ComponentFixture<GeekMissionBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeekMissionBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeekMissionBannerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
