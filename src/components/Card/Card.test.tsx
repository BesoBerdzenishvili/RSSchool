import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders the card with the given props', () => {
    const props = {
      imgUrl: 'test-image.jpg',
      price: 100,
      description: 'Test description',
      date: '2022-01-01',
    };
    const { getByText } = render(<Card {...props} />);
    expect(getByText('$100')).toBeTruthy();
    expect(getByText('Guide Price')).toBeTruthy();
    expect(getByText('Test description')).toBeTruthy();
    expect(getByText('Added on: 2022-01-01')).toBeTruthy();
  });

  it('renders POA if price is not provided', () => {
    const props = {
      imgUrl: 'test-image.jpg',
      description: 'Test description',
      date: '2022-01-01',
    };
    const { getByText } = render(<Card {...props} />);
    expect(getByText('POA')).toBeTruthy();
  });
});
