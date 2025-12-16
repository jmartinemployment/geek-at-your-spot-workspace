import { TestBed } from '@angular/core/testing';

import { GeekQuoteAiService } from './geek-quote-ai.service';

describe('GeekQuoteAiService', () => {
  let service: GeekQuoteAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeekQuoteAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
