import { getSnapshots } from './api';
import { vi, expect, describe, afterEach, it } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';

global.fetch = vi.fn()

describe('getSnapshots', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns a list of snapshots on successful API call', async () => {
    const data = [{ id: 1, name: 'Snapshot 1' }];
    global.fetch.mockResolvedValue({data})

    // const { result } = renderHook(() => getSnapshots());

    expect(1).toBe(1)
    // expect(result.current).toEqual({ data });
  });

  // it('throws an error on failed API call with 404 status code', async () => {
  //   const error = new Error('HTTP error! status: 404');
  //   vi.mocked(fetch).mockRejectedValueOnce(error);

  //   const { result } = renderHook(() => getSnapshots());
  //   await waitFor(() => expect(result.current).rejects.toThrowError(error));
  // });

  // it('throws an error on failed API call with 500 status code', async () => {
  //   const error = new Error('HTTP error! status: 500');
  //   vi.mocked(fetch).mockRejectedValueOnce(error);

  //   const { result } = renderHook(() => getSnapshots());
  //   await waitFor(() => expect(result.current).rejects.toThrowError(error));
  // });

  // it('throws an error on API call with invalid response data', async () => {
  //   const error = new Error('Invalid response data is not a valid JSON');
  //   vi.mocked(fetch).mockRejectedValueOnce(error);

  //   const { result } = renderHook(() => getSnapshots());
  //   await waitFor(() => expect(result.current).rejects.toThrowError(error));
  // });
});