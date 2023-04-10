import { it, describe, expect, vitest, beforeEach, afterEach, beforeAll, afterAll } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Home from './Home';

afterEach(() => {
  cleanup();
});

describe('Home', () => {
  beforeEach(() => {
    global.fetch = vitest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ info: true, results: [] }),
      })
    ) as unknown as typeof fetch;
  });

  it('renders the search component', () => {
    render(<Home />);
    expect(screen.getByRole('textbox')).toBeTruthy();
  });

  it('renders the loading component when fetching data', async () => {
    render(<Home />);
    expect(await screen.findByTestId('loading-test')).toBeTruthy();
  });

  it('updates the search value when typing in the search box', async () => {
    render(<Home />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Morty' } });
    expect(await screen.findByDisplayValue(/morty/i)).toBeTruthy();
  });

  it('logs an error to the console when fetch fails', async () => {
    const mockConsoleLog = vitest.fn();
    global.console.log = mockConsoleLog;
    global.fetch = vitest.fn(() => Promise.reject(new Error('Network error')));
    render(<Home />);
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockConsoleLog).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Network error' })
    );
  });
});
