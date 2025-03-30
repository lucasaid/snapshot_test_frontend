import "@testing-library/jest-dom";
import { render, fireEvent, renderHook, act, waitFor } from '@testing-library/react';
import { useDeleteDialog } from './DeleteDialog';

describe('DeleteDialog component', () => {
  it('renders correctly', async () => {
    const { result } = renderHook(() => useDeleteDialog());
    act(() => {
      const { getByText } = render(<result.current.DeleteDialog />);
      waitFor(() => expect(getByText('Are you sure you want to delete this snapshot?')).toBeInTheDocument())
    });
  });

  it('calls callback when confirmed', async () => {
    const { result } = renderHook(() => useDeleteDialog());
    const callback = jest.fn();
    act(() => {
      const { getByText } = render(<result.current.DeleteDialog />);
      result.current.handleDeleteOpen(callback);
      waitFor(() => {
        fireEvent.click(getByText('Confirm'));
        expect(callback).toHaveBeenCalledTimes(1);
      })
    });
  });

  it('does not call callback when cancelled', () => {
    const { result } = renderHook(() => useDeleteDialog());
    const callback = jest.fn();

    act(() => {
      const { getByText } = render(<result.current.DeleteDialog />);
      result.current.handleDeleteOpen(callback);
      waitFor(() => {
        fireEvent.click(getByText('Cancel'));
        expect(callback).not.toHaveBeenCalled();
      })
    });
  });

  it('matches snapshot', () => {
    const { result } = renderHook(() => useDeleteDialog());
    act(() => {
      const container = render(<result.current.DeleteDialog />);
      expect(container).toMatchSnapshot();
    });
  });
});