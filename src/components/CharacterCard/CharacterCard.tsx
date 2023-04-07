import React, { useState } from 'react';
import { CharacterCardData } from '../../types/DataTypes';
import './CharacterCard.css';
import CharacterModal from '../CharacterModal/CharacterModal';

interface CharacterCardProps {
  info: CharacterCardData;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ info }) => {
  const [showModal, setShowModal] = useState(false);
  const { image, name, status } = info;

  const handleClick = () => {
    setShowModal(true);
  };
  return (
    <>
      <div className="character-card" onClick={handleClick}>
        <img src={image} alt={name} className="character-img" />
        <h2>Name: {name}</h2>
        <p>
          Status: <span style={{ color: status === 'Alive' ? 'green' : 'red' }}>{status}</span>
        </p>
      </div>
      {showModal && <CharacterModal info={info} setShowModal={setShowModal} />}
    </>
  );
};

export default CharacterCard;
