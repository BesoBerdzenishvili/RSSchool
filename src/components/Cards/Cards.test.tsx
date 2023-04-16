import { test, describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { Cards } from './Cards';

const mockData = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Earth (Replacement Dimension)',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};

describe('Cards', () => {
  test('renders no cards when the store is empty', () => {
    render(
      <Provider store={store}>
        <Cards />
      </Provider>
    );
    const cards = screen.queryAllByTestId('card');
    expect(cards.length).toBe(0);
  });

  test('renders cards when the store has data', () => {
    store.dispatch({
      type: 'ADD_CARD',
      payload: mockData,
    });

    render(
      <Provider store={store}>
        <Cards />
      </Provider>
    );
    expect(screen.getByTestId('cards')).toBeTruthy();
  });
});
