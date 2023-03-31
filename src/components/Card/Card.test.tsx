import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders the card with the given props', () => {
    const props = {
      id: '1',
      img: new File(['test-image.jpg'], 'test-image.jpg'),
      price: 100,
      priceType: 'Guide Price',
      showPrice: true,
      description: 'Test description',
      date: '2022-01-01',
      recieveEmails: 'yes',
    };
    const { getByText } = render(<Card data={props} />);
    expect(getByText('$100')).toBeTruthy();
    expect(getByText('Guide Price')).toBeTruthy();
    expect(getByText('Test description')).toBeTruthy();
    expect(getByText('Added on: 2022-01-01')).toBeTruthy();
  });

  it('renders POA if showPrice is false', () => {
    const props = {
      id: '1',
      img: new File(['test-image.jpg'], 'test-image.jpg'),
      price: 100,
      priceType: 'Guide Price',
      showPrice: false,
      description: 'Test description',
      date: '2022-01-01',
      recieveEmails: 'yes',
    };
    const { getByText } = render(<Card data={props} />);
    expect(getByText('POA')).toBeTruthy();
  });
});
