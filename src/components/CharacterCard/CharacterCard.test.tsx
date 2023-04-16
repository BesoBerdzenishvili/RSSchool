import { it, test, describe, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import CharacterCard from './CharacterCard';
import { CharacterCardData } from '../../types/DataTypes';

const character: CharacterCardData = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: '' },
  location: { name: 'Earth (Replacement Dimension)', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: '',
  created: '',
};

describe('CharacterCard', () => {
  test('renders character information', () => {
    const { getByText, getAllByText, getAllByTestId } = render(<CharacterCard info={character} />);
    expect(getByText(`Name: ${character.name}`)).toBeTruthy();
    expect(getAllByText(`Status:`)).toBeTruthy();
    expect(getAllByTestId('character-img-1')).toBeTruthy();
  });

  it('status color for not live character', () => {
    character.status = 'dead';
    const { getByText } = render(<CharacterCard info={character} />);
    const statusElement = getByText('dead');
    const color = getComputedStyle(statusElement).color;
    expect(color).toBe('red');
  });

  // test('should show modal when clicked', () => {
  //   const { getAllByTestId } = render(<CharacterCard info={character} />);
  //   const btn = getAllByTestId('character-card')[0];
  //   fireEvent.click(btn);
  // });

  test('should show modal when clicked', () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <CharacterCard info={character} />
      </Provider>
    );
    const btn = getAllByTestId('character-card')[0];
    fireEvent.click(btn);
  });
});
