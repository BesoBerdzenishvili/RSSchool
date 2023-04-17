import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import App from '../App';

test('renders App component', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(getByTestId('app')).toBeTruthy();
});
