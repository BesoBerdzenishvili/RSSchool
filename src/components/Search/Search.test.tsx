import { it, describe, expect, vitest, afterEach } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Search from './Search';

afterEach(() => {
  cleanup();
});

describe('Search', () => {
  const setSearchValue = vitest.fn();
  const setup = () => {
    const { getByRole } = render(<Search setSearchValue={setSearchValue} />);
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
    expect(setSearchValue).toHaveBeenCalledWith(input.value);
  });

  it('saves the input value to local storage on beforeunload', () => {
    const setItemSpy = vitest.spyOn(Storage.prototype, 'setItem');
    setup();
    fireEvent(window, new Event('beforeunload'));
    expect(setItemSpy).toHaveBeenCalledWith('inputValue', 'test');
    setItemSpy.mockRestore();
  });
});
