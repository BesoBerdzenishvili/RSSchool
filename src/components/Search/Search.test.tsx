import { it, describe, expect, vitest, afterEach } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Search from './Search';

afterEach(() => {
  cleanup();
});

describe('Search', () => {
  const setSearchValue = vitest.fn();
  const setup = () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Search setSearchValue={setSearchValue} />
      </Provider>
    );
    const input = getByRole('textbox') as HTMLInputElement;
    return {
      input,
    };
  };

  it('renders the search input', () => {
    const { input } = setup();
    expect(input).toBeTruthy();
  });

  it('updates the input value on change', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });

  it('calls setSearchValue on enter key press', () => {
    const { input } = setup();
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(setSearchValue).toHaveBeenCalledWith('test');
  });
});
