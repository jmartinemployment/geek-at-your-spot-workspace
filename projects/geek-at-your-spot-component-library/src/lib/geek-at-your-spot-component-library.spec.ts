import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekAtYourSpotComponentLibrary } from './geek-at-your-spot-component-library';

describe('GeekAtYourSpotComponentLibrary', () => {
  let component: GeekAtYourSpotComponentLibrary;
  let fixture: ComponentFixture<GeekAtYourSpotComponentLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeekAtYourSpotComponentLibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeekAtYourSpotComponentLibrary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
