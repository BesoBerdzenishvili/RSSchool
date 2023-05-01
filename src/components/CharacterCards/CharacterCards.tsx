import React from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import { CharacterCardData } from '../../types/DataTypes';
import './CharacterCards.css';

interface CharacterCardsProps {
  characters: CharacterCardData[];
}

const CharacterCards: React.FC<CharacterCardsProps> = ({ characters }) => {
  return (
    <div data-testid="character-cards" className="character-cards">
      {characters.map((character) => (
        <CharacterCard key={character.id} info={character} />
      ))}
    </div>
  );
};

export default CharacterCards;
