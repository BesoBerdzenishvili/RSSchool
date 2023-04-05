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
test('Cards component should display "Please add data" message when formData is empty', () => {
  const formData: [] = [];

  const setFormData = () => {};

  const { getByText } = render(
    <FormDataContext.Provider value={{ formData, setFormData }}>
      <Cards />
    </FormDataContext.Provider>
  );

  expect(getByText('Please add data')).toBeTruthy();
});
