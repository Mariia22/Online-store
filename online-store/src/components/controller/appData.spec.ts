import { StoreState } from './state';

describe('State', () => {
  let state: StoreState;
  beforeEach(() => {
    state = new StoreState();
  });

  it('it should convert data from a string to an object', () => {
    const data = state.getLocalStorageState();
    expect(data).toEqual(null);
  });
});
