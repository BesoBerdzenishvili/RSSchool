import React from 'react';
import { CharacterCardData } from '../../types/DataTypes';
import './CharacterCard.css';

interface CharacterCardProps {
  info: CharacterCardData;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ info }) => {
  const { image, name, status } = info;
  return (
    <div className="character-card">
      <img src={image} alt={name} className="character-img" />
      <h2>Name: {name}</h2>
      <p>
        Status: <span style={{ color: status === 'Alive' ? 'green' : 'red' }}>{status}</span>
      </p>
    </div>
  );
};

export default CharacterCard;
