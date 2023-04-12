import { it, vitest, describe, expect, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react';
import CharacterModal from './CharacterModal';

afterEach(() => {
  cleanup();
});

describe('CharacterModal component', () => {
  const mockSetShowModal = vitest.fn();

  afterEach(() => {
    vitest.restoreAllMocks();
  });

  it('should render loading state initially', () => {
    render(<CharacterModal id={1} setShowModal={mockSetShowModal} />);
    expect(screen.getByTestId('loading-test')).toBeTruthy();
  });

  it('should render error message if fetch fails', async () => {
    vitest.spyOn(console, 'error').mockImplementation(() => {});
    vitest.spyOn(window, 'fetch').mockImplementation(() => Promise.reject());

    render(<CharacterModal id={1} setShowModal={mockSetShowModal} />);
    await waitFor(() => expect(screen.getByText('Something went wrong...')).toBeTruthy());
  });

  it('should close modal when X button is clicked', async () => {
    render(<CharacterModal id={1} setShowModal={mockSetShowModal} />);
    await waitFor(() => expect(screen.getByTestId('modal-container')).toBeTruthy());

    const closeButton = screen.getByTestId('delete-btn-x');
    fireEvent.click(closeButton);

    expect(mockSetShowModal).toHaveBeenCalledTimes(1);
    expect(mockSetShowModal).toHaveBeenCalledWith(false);
  });

  it('should call setShowModal when clicking overlay or delete button', async () => {
    render(<CharacterModal id={1} setShowModal={mockSetShowModal} />);
    await waitFor(() => expect(screen.getAllByTestId('modal-container')).toBeTruthy());

    const overlay = screen.getByTestId('unique-test-name');

    fireEvent.click(overlay);
    expect(mockSetShowModal).toHaveBeenCalledWith(false);

    const deleteButton = screen.getByTestId('delete-btn-x');
    fireEvent.click(deleteButton);
    expect(mockSetShowModal).toHaveBeenCalledWith(false);

    await waitFor(() => expect(screen.queryByRole('presentation')).not.toBeTruthy());
  });
});
