import { vi, it, expect, describe } from 'vitest';
import { screen, render } from '@testing-library/react';
import Form from './Form';

vi.mock('./Add/Add', () => ({ default: () => <div>Add</div> }));
vi.mock('../../components/Cards/Cards', () => ({ Cards: () => <div>Cards</div> }));

describe('Form', () => {
  it('renders Add and Cards components', () => {
    render(<Form />);
    expect(screen.getByText('Add')).toBeTruthy();
    expect(screen.getByText('Cards')).toBeTruthy();
  });
});
