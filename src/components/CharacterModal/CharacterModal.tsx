import React from 'react';
import { CharacterCardData } from '../../types/DataTypes';
import './CharacterModal.css';

interface ModalProps {
  info: CharacterCardData;
  setShowModal: (show: boolean) => void;
}

const CharacterModal: React.FC<ModalProps> = ({ info, setShowModal }) => {
  const { name, status, species, type, gender, origin, location, image, episode } = info;

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClick}>
      <div className="modal-container">
        <button className="delete-btn" onClick={handleClick}>
          X
        </button>
        <h2>Character Info</h2>
        <img src={image} alt={name} className="modal-img" width="100%" />
        <p>
          <b>Name:</b> {name}
        </p>
        <p>
          <b>Status:</b>{' '}
          <span style={{ color: status === 'Alive' ? 'green' : 'red' }}>{status}</span>
        </p>
        <p>
          <b>Species:</b> {species}
        </p>
        {type && (
          <p>
            <b>Type:</b> type
          </p>
        )}
        <p>
          <b>Gender:</b> {gender}
        </p>
        <p>
          <b>Origin:</b> {origin.name}
        </p>
        <p>
          <b>Location:</b> {location.name}
        </p>
        <p>
          <b>Episodes:</b> {episode.length}
        </p>
      </div>
    </div>
  );
};

export default CharacterModal;
