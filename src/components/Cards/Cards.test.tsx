import { render } from '@testing-library/react';
import { test, expect } from 'vitest';
import { Cards } from './Cards';
import { FormDataContext } from '../../contexts/formDataContext';

test('Cards component should render correctly', () => {
  const formData = [
    {
      id: '1',
      img: undefined,
      price: 10,
      priceType: 'USD',
      agreeTerms: true,
      description: 'Test description',
      date: '2022-01-01',
      recieveEmails: 'yes',
    },
  ];

  const setFormData = () => {};

  const { getByText } = render(
    <FormDataContext.Provider value={{ formData, setFormData }}>
      <Cards />
    </FormDataContext.Provider>
  );

  expect(getByText('Test description')).toBeTruthy();
});

test('Cards component should render multiple Card components', () => {
  const formData = [
    {
      id: '1',
      img: undefined,
      price: 10,
      priceType: 'USD',
      agreeTerms: true,
      description: 'Test description 1',
      date: '2022-01-01',
      recieveEmails: 'yes',
    },
    {
      id: '2',
      img: undefined,
      price: 20,
      priceType: 'USD',
      agreeTerms: true,
      description: 'Test description 2',
      date: '2022-01-02',
      recieveEmails: 'no',
    },
    {
      id: '3',
      img: undefined,
      price: 30,
      priceType: 'USD',
      agreeTerms: true,
      description: 'Test description 3',
      date: '2022-01-03',
      recieveEmails: 'yes',
    },
  ];

  const setFormData = () => {};

  const { getByText } = render(
    <FormDataContext.Provider value={{ formData, setFormData }}>
      <Cards />
    </FormDataContext.Provider>
  );

  expect(getByText('Test description 1')).toBeTruthy();
  expect(getByText('Test description 2')).toBeTruthy();
  expect(getByText('Test description 3')).toBeTruthy();
});
