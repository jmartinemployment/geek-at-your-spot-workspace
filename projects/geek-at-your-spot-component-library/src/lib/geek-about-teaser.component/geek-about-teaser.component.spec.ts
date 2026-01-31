import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeekAboutTeaserComponent } from './geek-about-teaser.component';

describe('GeekAboutTeaserComponent', () => {
  let component: GeekAboutTeaserComponent;
  let fixture: ComponentFixture<GeekAboutTeaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeekAboutTeaserComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GeekAboutTeaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have tagline about technology journey', () => {
    expect(component.tagline()).toContain('Timex Sinclair');
  });

  it('should link to about page', () => {
    expect(component.aboutPageUrl()).toBe('/about');
  });
});
