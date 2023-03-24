import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import About from './About';

describe('About', () => {
  it('Renders', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/About/i)).toBeDefined();
  });
});
