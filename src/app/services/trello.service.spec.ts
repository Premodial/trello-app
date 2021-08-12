/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TrelloService } from './trello.service';

describe('Service: Trello', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrelloService]
    });
  });

  it('should ...', inject([TrelloService], (service: TrelloService) => {
    expect(service).toBeTruthy();
  }));
});
