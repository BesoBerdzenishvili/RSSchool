import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import NoMatch from './NoMatch';

describe('NoMatch', () => {
  it('Renders', () => {
    render(
      <BrowserRouter>
        <NoMatch />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/404/i)).toBeDefined();
  });
});
