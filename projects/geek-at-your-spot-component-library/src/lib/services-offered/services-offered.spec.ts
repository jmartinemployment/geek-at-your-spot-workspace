import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesOffered } from './services-offered';

describe('ServicesOffered', () => {
  let component: ServicesOffered;
  let fixture: ComponentFixture<ServicesOffered>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesOffered]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesOffered);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
