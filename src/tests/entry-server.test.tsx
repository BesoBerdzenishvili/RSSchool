import { render } from '../entry-server';
import { expect, describe, it } from 'vitest';
import { RenderToPipeableStreamOptions } from 'react-dom/server';

describe('render', () => {
  it('renders the App component with the given URL and options', () => {
    const url = '/test';
    const options: RenderToPipeableStreamOptions = {};
    const result = render(url, options);
    expect(result).toBeDefined();
  });
});
