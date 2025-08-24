import { TestBed } from '@angular/core/testing';

import { AssetList } from './asset-list';

describe('AssetList', () => {
  let service: AssetList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
