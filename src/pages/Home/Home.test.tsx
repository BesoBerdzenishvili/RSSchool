import { test, describe, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Home from './Home';

describe('Home', () => {
  test('renders Search and CharacterCards components', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(screen.getByPlaceholderText(/search/i)).toBeTruthy();
    expect(screen.getByTestId('loading-test')).toBeTruthy();
  });

  test('updates searchValue in localStorage on input change', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'Rick' } });
    expect(localStorage.getItem('searchValue')).toBe(null);
  });
});
