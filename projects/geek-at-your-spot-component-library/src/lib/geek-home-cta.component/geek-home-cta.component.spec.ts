import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeekHomeCTAComponent } from './geek-home-cta.component';

describe('GeekHomeCTAComponent', () => {
  let component: GeekHomeCTAComponent;
  let fixture: ComponentFixture<GeekHomeCTAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeekHomeCTAComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GeekHomeCTAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have headline about transformation', () => {
    expect(component.headline()).toContain('Transform');
  });

  it('should have contact information', () => {
    expect(component.email()).toBe('contact@geekatyourspot.com');
  });
});
