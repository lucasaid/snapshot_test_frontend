import { getSnapshots } from './api';
import { waitFor } from '@testing-library/react';

const data = [{ id: 1, name: 'Snapshot 1' }];
global.fetch = jest.fn() as jest.Mock;
describe('getSnapshots', () => {
  beforeEach(() => {  
    (global.fetch as jest.Mock).mockClear();
  });

  it('returns a list of snapshots on successful API call', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve({ok: true, json: () => Promise.resolve({data}) }));

    const result = await getSnapshots()

    await waitFor(() => expect(result).toEqual({ data })  );
  });
});
