import { it, describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormData } from '../../types/FormData';
import Card from './Card';

const data: FormData = {
  id: 'test-id',
  img: undefined,
  price: 1001,
  priceType: 'Guide Price',
  agreeTerms: true,
  description: 'Test Description',
  date: '2022-01-01',
  recieveEmails: 'yes',
};
describe('Card', () => {
  it('renders the price', () => {
    render(<Card data={data} />);
    expect(screen.getByText('$1001')).toBeTruthy();
  });

  it('renders the priceType', () => {
    render(<Card data={data} />);
    expect(screen.getByText('Guide Price')).toBeTruthy();
  });

  it('renders the description', () => {
    render(<Card data={data} />);
    expect(screen.getByText('Test Description')).toBeTruthy();
  });

  it('renders the date', () => {
    render(<Card data={data} />);
    expect(screen.getByText('Added on: 2022-01-01')).toBeTruthy();
  });

  it('does not render the image if URL is undefined', () => {
    const URL = undefined;
    render(<Card data={data} />);
    expect(screen.queryByAltText('card image')).not.toBeTruthy();
  });

  it('does not render the image if createObjectURL is undefined', () => {
    const originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = () => '';
    render(<Card data={data} />);
    expect(screen.queryByAltText('card image')).not.toBeTruthy();
    URL.createObjectURL = originalCreateObjectURL;
  });

  describe('Card', () => {
    it('renders the image if URL and createObjectURL are defined', () => {
      const originalCreateObjectURL = URL.createObjectURL;
      URL.createObjectURL = () => 'test-url';
      const dataWithImg: FormData = {
        ...data,
        img: {
          0: new File([''], 'test.png', { type: 'image/png' }),
          length: 1,
          item: () => new File([''], 'test.png', { type: 'image/png' }),
        } as unknown as FileList,
      };
      render(<Card data={dataWithImg} />);
      expect(screen.getByAltText('card image')).toBeTruthy();
      URL.createObjectURL = originalCreateObjectURL;
    });
  });
});
