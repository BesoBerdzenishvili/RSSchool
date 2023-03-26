import { test, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { FormDataContext } from '../../contexts/formDataContext';
import Add from './Add';

test('Add form submits data to context', async () => {
  const formData = [
    {
      id: '1',
      img: undefined,
      price: 10,
      priceType: 'per hour',
      showPrice: true,
      description: 'Test description',
      date: '2023-03-26',
      recieveEmails: 'yes',
    },
  ];

  const setFormData = () => {};

  const { getByLabelText, getByText } = render(
    <FormDataContext.Provider value={{ formData, setFormData }}>
      <Add />
    </FormDataContext.Provider>
  );

  const priceTypeSelect = getByLabelText('Price Type');
  const descriptionInput = getByLabelText('Description');
  const dateInput = getByLabelText('Date');
  const recieveEmailsRadioYes = getByLabelText('Yes');
  const recieveEmailsRadioNo = getByLabelText('No');
  const submitButton = getByText('Submit');

  fireEvent.change(priceTypeSelect, { target: { value: 'per hour' } });
  fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
  fireEvent.change(dateInput, { target: { value: '2023-03-26' } });
  fireEvent.click(recieveEmailsRadioYes);
  fireEvent.click(submitButton);

  expect(setFormData).toHaveBeenCalledWith([
    ...formData,
    {
      id: expect.any(String),
      img: undefined,
      price: 10,
      priceType: 'per hour',
      showPrice: true,
      description: 'Test description',
      date: '2023-03-26',
      recieveEmails: 'yes',
    },
    {
      id: expect.any(String),
      img: undefined,
      price: undefined,
      priceType: 'per hour',
      showPrice: true,
      description: 'Test description',
      date: '2023-03-26',
      recieveEmails: 'yes',
    },
  ]);

  fireEvent.change(priceTypeSelect, { target: { value: 'fixed' } });
  fireEvent.change(descriptionInput, { target: { value: 'Another description' } });
  fireEvent.change(dateInput, { target: { value: '2023-03-27' } });
  fireEvent.click(recieveEmailsRadioNo);
  fireEvent.click(submitButton);

  expect(setFormData).toHaveBeenCalledWith([
    ...formData,
    {
      id: expect.any(String),
      img: undefined,
      price: 10,
      priceType: 'per hour',
      showPrice: true,
      description: 'Test description',
      date: '2023-03-26',
      recieveEmails: 'yes',
    },
    {
      id: expect.any(String),
      img: undefined,
      price: undefined,
      priceType: 'per hour',
      showPrice: true,
      description: 'Test description',
      date: '2023-03-26',
      recieveEmails: 'yes',
    },
    {
      id: expect.any(String),
      img: undefined,
      price: undefined,
      priceType: 'fixed',
      showPrice: true,
      description: 'Another description',
      date: '2023-03-27',
      recieveEmails: 'no',
    },
  ]);
});
