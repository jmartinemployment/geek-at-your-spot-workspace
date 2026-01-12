import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekFortyYearsBannerComponent } from './geek-forty-years-banner.component';

describe('GeekFortyYearsBannerComponent', () => {
  let component: GeekFortyYearsBannerComponent;
  let fixture: ComponentFixture<GeekFortyYearsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeekFortyYearsBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeekFortyYearsBannerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
