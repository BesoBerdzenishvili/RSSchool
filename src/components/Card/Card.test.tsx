import { it, describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormData } from '../../types/DataTypes';
import Card from './Card';

const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
const data: FormData = {
  id: 'test-id',
  img: {
    0: file,
    length: 1,
    item: (index: number) => file,
  } as unknown as FileList,
  price: 1001,
  priceType: 'Guide Price',
  agreeTerms: true,
  description: 'Test Description',
  date: '2022-01-01',
  recieveEmails: 'yes',
};
describe('Card', () => {
  it('does not render the image if createObjectURL is undefined', () => {
    const originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = () => '';
    render(<Card data={data} />);
    expect(screen.queryByAltText('card image')).toBeTruthy();
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
