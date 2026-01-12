import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekFooterComponent } from './geek-footer.component';

describe('GeekFooterComponent', () => {
  let component: GeekFooterComponent;
  let fixture: ComponentFixture<GeekFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeekFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeekFooterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
