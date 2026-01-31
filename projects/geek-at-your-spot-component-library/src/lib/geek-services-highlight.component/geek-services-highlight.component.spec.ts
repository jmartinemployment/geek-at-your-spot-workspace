import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeekServicesHighlightComponent } from './geek-services-highlight.component';

describe('GeekServicesHighlightComponent', () => {
  let component: GeekServicesHighlightComponent;
  let fixture: ComponentFixture<GeekServicesHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeekServicesHighlightComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GeekServicesHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have exactly 4 highlighted services', () => {
    expect(component.services().length).toBe(4);
  });

  it('should have AI Integration as first service', () => {
    expect(component.services()[0].title).toBe('AI Integration');
  });
});
