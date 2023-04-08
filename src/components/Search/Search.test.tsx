import { describe, expect, it, vitest } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Search from './Search';

const mockSetLoading = vitest.fn();
const mockSetError = vitest.fn();
const mockSetCharacters = vitest.fn();
describe('Search', () => {
  it('renders an input element with the class search-input', () => {
    const { container } = render(
      <Search
        setLoading={mockSetLoading}
        setError={mockSetError}
        setCharacters={mockSetCharacters}
      />
    );
    const input = container.querySelector('input.search-input');
    expect(input).not.toBeNull();
  });

  it('updates the input value when a change event is fired', () => {
    const { container } = render(
      <Search
        setLoading={mockSetLoading}
        setError={mockSetError}
        setCharacters={mockSetCharacters}
      />
    );
    const input = container.querySelector('input.search-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });
  it('saves the value to localStorage when the beforeunload event is fired', () => {
    const { container } = render(
      <Search
        setLoading={mockSetLoading}
        setError={mockSetError}
        setCharacters={mockSetCharacters}
      />
    );
    const input = container.querySelector('input.search-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent(window, new Event('beforeunload'));
    expect(localStorage.getItem('searchValue')).toBe('test');
  });
});

it('loads the value from localStorage on mount', () => {
  localStorage.setItem('searchValue', 'test');
  const { container } = render(
    <Search setLoading={mockSetLoading} setError={mockSetError} setCharacters={mockSetCharacters} />
  );
  const input = container.querySelector('input.search-input') as HTMLInputElement;
  expect(input.value).toBe('test');
});

it('saves the value to localStorage on unmount', () => {
  const { container, unmount } = render(
    <Search setLoading={mockSetLoading} setError={mockSetError} setCharacters={mockSetCharacters} />
  );
  const input = container.querySelector('input.search-input') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'test' } });
  unmount();
  expect(localStorage.getItem('searchValue')).toBe('test');
});

it('fetches data from the API when the Enter key is pressed', async () => {
  const { container } = render(
    <Search setLoading={mockSetLoading} setError={mockSetError} setCharacters={mockSetCharacters} />
  );

  const input = container.querySelector('input.search-input') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'test' } });
  fireEvent.keyDown(input, { key: 'Enter' });

  await waitFor(() => expect(mockSetLoading).toHaveBeenCalledWith(true));
  await waitFor(() => expect(mockSetError).toHaveBeenCalledWith(''));
  await waitFor(() => expect(mockSetCharacters).toHaveBeenCalled());
});

it('sets an error message when an error occurs while fetching data', async () => {
  vitest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('test error')));

  const { container } = render(
    <Search setLoading={mockSetLoading} setError={mockSetError} setCharacters={mockSetCharacters} />
  );

  const input = container.querySelector('input.search-input') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'test' } });
  fireEvent.keyDown(input, { key: 'Enter' });

  await waitFor(() => expect(mockSetError).toHaveBeenCalledWith('Something went wrong...'));
});
it('sets an error message when the API returns an error', async () => {
  vitest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({ error: 'test error' }),
    } as Response)
  );

  const { container } = render(
    <Search setLoading={mockSetLoading} setError={mockSetError} setCharacters={mockSetCharacters} />
  );

  const input = container.querySelector('input.search-input') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'test' } });
  fireEvent.keyDown(input, { key: 'Enter' });

  await waitFor(() => expect(mockSetError).toHaveBeenCalledWith('test error'));
});
