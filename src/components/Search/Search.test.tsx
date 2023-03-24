import { describe, expect, it } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search', () => {
  it('renders an input element with the class search-input', () => {
    const { container } = render(<Search />);
    const input = container.querySelector('input.search-input');
    expect(input).not.toBeNull();
  });

  it('updates the input value when a change event is fired', () => {
    const { container } = render(<Search />);
    const input = container.querySelector('input.search-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });
});

it('loads the value from localStorage on mount', () => {
  localStorage.setItem('searchValue', 'test');
  const { container } = render(<Search />);
  const input = container.querySelector('input.search-input') as HTMLInputElement;
  expect(input.value).toBe('test');
});

it('saves the value to localStorage on unmount', () => {
  const { container, unmount } = render(<Search />);
  const input = container.querySelector('input.search-input') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'test' } });
  unmount();
  expect(localStorage.getItem('searchValue')).toBe('test');
});
