import { test, describe, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FormDataProvider } from '../../../contexts/formDataContext';
import Add from './Add';

describe('Add', () => {
  test('renders form fields', () => {
    render(
      <Router>
        <Add />
      </Router>
    );
    expect(screen.getByLabelText('Image:')).toBeTruthy();
    expect(screen.getByLabelText('Price:')).toBeTruthy();
    expect(screen.getByLabelText('Price Type:')).toBeTruthy();
    expect(screen.getByLabelText('Description:')).toBeTruthy();
    expect(screen.getByLabelText('Date:')).toBeTruthy();
    expect(screen.getByLabelText('Recieve Emails:')).toBeTruthy();
    expect(screen.getByLabelText('I agree to terms of service')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeTruthy();
  });

  test('form submission with required fields', async () => {
    const { container } = render(
      <Router>
        <FormDataProvider>
          <Add />
        </FormDataProvider>
      </Router>
    );
    const imageInput = screen.getByLabelText('Image:');
    const priceInput = screen.getByLabelText('Price:');
    const priceTypeInput = screen.getByLabelText('Price Type:');
    const descriptionInput = screen.getByLabelText('Description:');
    const dateInput = screen.getByLabelText('Date:');
    const receiveEmailsInput = screen.getByLabelText('Recieve Emails:');
    const agreeTermsInput = screen.getByLabelText('I agree to terms of service');

    fireEvent.change(imageInput, { target: { files: [new File([], 'image.png')] } });
    fireEvent.change(priceInput, { target: { value: '1500' } });
    fireEvent.click(priceTypeInput);
    fireEvent.change(descriptionInput, { target: { value: 'This is a test description.' } });
    fireEvent.change(dateInput, { target: { value: '2023-04-01' } });
    fireEvent.change(receiveEmailsInput, { target: { value: 'every week' } });
    fireEvent.click(agreeTermsInput);

    fireEvent.submit(container.querySelector('form')!);
    expect.objectContaining({
      id: expect.any(String),
      img: expect.any(File),
      price: 1500,
      priceType: 'Guide Price',
      description: 'This is a test description.',
      date: '2023-04-01',
      receiveEmails: 'every week',
      agreeTerms: true,
    });
  });
});
