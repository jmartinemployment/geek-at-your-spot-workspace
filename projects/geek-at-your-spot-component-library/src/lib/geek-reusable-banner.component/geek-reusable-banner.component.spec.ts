import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekReusableBannerComponent } from './geek-reusable-banner.component';

describe('GeekReusableBannerComponent', () => {
  let component: GeekReusableBannerComponent;
  let fixture: ComponentFixture<GeekReusableBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeekReusableBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeekReusableBannerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
