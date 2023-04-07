import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { FormDataProvider, FormDataContext } from './formDataContext';
import { FormData } from '../types/DataTypes';

test('FormDataContext should provide formData and setFormData', () => {
  const testFormData: FormData[] = [
    {
      id: '1',
      img: undefined,
      price: 10,
      priceType: 'USD',
      agreeTerms: true,
      description: 'Test item',
      date: '2022-01-01',
      recieveEmails: 'yes',
    },
  ];

  const TestComponent = () => {
    const { formData, setFormData } = React.useContext(FormDataContext);

    React.useEffect(() => {
      setFormData(testFormData);
    }, [setFormData]);

    return (
      <>
        {formData.map((item) => (
          <div key={item.id}>{item.description}</div>
        ))}
      </>
    );
  };

  render(
    <FormDataProvider>
      <TestComponent />
    </FormDataProvider>
  );

  expect(screen.getByText('Test item')).toBeTruthy();
});

test('FormDataProvider should render children', () => {
  const TestComponent = () => <div>Test</div>;

  render(
    <FormDataProvider>
      <TestComponent />
    </FormDataProvider>
  );

  expect(screen.getByText('Test')).toBeTruthy();
});
