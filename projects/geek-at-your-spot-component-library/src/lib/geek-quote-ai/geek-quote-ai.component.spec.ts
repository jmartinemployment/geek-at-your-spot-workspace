import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeekQuoteAi } from './geek-quote-ai.component';

describe('GeekQuoteAi', () => {
  let component: GeekQuoteAi;
  let fixture: ComponentFixture<GeekQuoteAi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeekQuoteAi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeekQuoteAi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
