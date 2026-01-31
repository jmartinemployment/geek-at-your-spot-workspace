import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeekTrustBarComponent } from './geek-trust-bar.component';

describe('GeekTrustBarComponent', () => {
  let component: GeekTrustBarComponent;
  let fixture: ComponentFixture<GeekTrustBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeekTrustBarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GeekTrustBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 trust stats', () => {
    expect(component.stats().length).toBe(4);
  });
});
