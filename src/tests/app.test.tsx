import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../redux/store';
import App from '../App';

describe('entryClient', () => {
  it('renders the App component', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    expect(getByTestId('app')).toBeTruthy();
  });
});
