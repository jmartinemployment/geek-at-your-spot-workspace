import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekBannerComponent } from './geek-banner.component';

describe('GeekBannerComponent', () => {
  let component: GeekBannerComponent;
  let fixture: ComponentFixture<GeekBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeekBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeekBannerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
