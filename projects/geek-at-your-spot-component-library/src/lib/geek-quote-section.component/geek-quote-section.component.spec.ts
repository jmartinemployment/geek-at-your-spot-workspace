import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeekQuoteSectionComponent } from './geek-quote-section.component';

describe('GeekQuoteSectionComponent', () => {
  let component: GeekQuoteSectionComponent;
  let fixture: ComponentFixture<GeekQuoteSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeekQuoteSectionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GeekQuoteSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have headline about instant estimates', () => {
    expect(component.headline()).toContain('Instant');
  });
});
