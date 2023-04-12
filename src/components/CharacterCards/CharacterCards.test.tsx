import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import CharacterCards from './CharacterCards';
import { CharacterCardData } from '../../types/DataTypes';

describe('CharacterCards', () => {
  test('renders a list of CharacterCard components', () => {
    const characters: CharacterCardData[] = [
      {
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
      },
    ];
    const { getAllByTestId } = render(<CharacterCards characters={characters} />);
    expect(getAllByTestId('character-cards')).toHaveLength(characters.length);
  });
});
