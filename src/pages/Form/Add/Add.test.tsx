import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import { test, describe, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Add from './Add';

describe('Add component', () => {
  test('renders form elements correctly', () => {
    render(
      <Provider store={store}>
        <Add />
      </Provider>
    );
    expect(screen.getByLabelText('Image:')).toBeTruthy();
    expect(screen.getByLabelText('Price:')).toBeTruthy();
    expect(screen.getByLabelText('Price Type:')).toBeTruthy();
    expect(screen.getByLabelText('Description:')).toBeTruthy();
    expect(screen.getByLabelText('Date:')).toBeTruthy();
    expect(screen.getByLabelText('Recieve Emails:')).toBeTruthy();
    expect(screen.getByLabelText('I agree to terms of service')).toBeTruthy();
    expect(screen.getByRole('button')).toBeTruthy();
  });

  test('validates required fields on submit', async () => {
    render(
      <Provider store={store}>
        <Add />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    const errorMessages = [
      'Image is required',
      'Price must be greater than or equal to 1000',
      'Price Type is required',
      'Description must be at least 10 characters long',
      'Date is required',
      'Recieve Emails is required',
    ];

    for (const message of errorMessages) {
      expect(await screen.findByText(message)).toBeTruthy();
    }
  });

  test('validates minimum price on submit', async () => {
    render(
      <Provider store={store}>
        <Add />
      </Provider>
    );
    fireEvent.change(screen.getByLabelText('Price:'), { target: { value: '999' } });
    fireEvent.click(screen.getByRole('button'));

    const error = await screen.findByText('Price must be greater than or equal to 1000');
    expect(error).toBeTruthy();
  });

  test('validates minimum description length on submit', async () => {
    render(
      <Provider store={store}>
        <Add />
      </Provider>
    );
    fireEvent.change(screen.getByLabelText('Description:'), { target: { value: 'a' } });
    fireEvent.click(screen.getByRole('button'));

    const error = await screen.findByText('Description must be at least 10 characters long');
    expect(error).toBeTruthy();
  });
});
