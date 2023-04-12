import React, { useState, useEffect } from 'react';
import { CharacterCardData } from '../../types/DataTypes';
import Loading from '../Loading/Loading';
import './CharacterModal.css';

interface ModalProps {
  id: number;
  setShowModal: (show: boolean) => void;
}

const CharacterModal: React.FC<ModalProps> = ({ id, setShowModal }) => {
  const [data, setData] = useState<CharacterCardData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
        setError('Something went wrong...');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClick} data-testid={'modal-overlay-' + id}>
      {loading ? (
        <Loading />
      ) : error ? (
        <p>{error}</p>
      ) : data ? (
        <div className="modal-container" data-testid="modal-container">
          <button data-testid="delete-btn-x" className="delete-btn" onClick={handleClick}>
            X
          </button>
          <h2>Character Info</h2>
          <img src={data.image} alt={data.name} className="modal-img" width="100%" />
          <p>
            <b>Name:</b> {data.name}
          </p>
          <p>
            <b>Status:</b>{' '}
            <span style={{ color: data.status === 'Alive' ? 'green' : 'red' }}>{data.status}</span>
          </p>
          <p>
            <b>Species:</b> {data.species}
          </p>
          {data.type && (
            <p>
              <b>Type:</b> {data.type}
            </p>
          )}
          <p>
            <b>Gender:</b> {data.gender}
          </p>
          <p>
            <b>Origin:</b> {data.origin.name}
          </p>
          <p>
            <b>Location:</b> {data.location.name}
          </p>
          <p>
            <b>Episodes:</b> {data.episode.length}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default CharacterModal;
