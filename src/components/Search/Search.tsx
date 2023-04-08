import React, { useState, useEffect } from 'react';
import { CharacterCardData } from '../../types/DataTypes';
import './Search.css';

type PropsTypes = {
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setCharacters: (characters: CharacterCardData[]) => void;
};

const Search: React.FC<PropsTypes> = ({ setCharacters, setLoading, setError }) => {
  const [searchValue, setSearchValue] = useState(() => {
    const saved = localStorage.getItem('searchValue');
    return saved ? saved : '';
  });

  const handleKeyDown = async (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${searchValue}`
        );
        const data = await response.json();
        if (data.info) {
          setCharacters(data.results);
        } else if (data.error) {
          console.log(data.error);
          setError(data.error);
        }
        setCharacters(data.results);
      } catch (error) {
        console.log(error);
        setError('Something went wrong...');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('searchValue', searchValue);
  }, [searchValue]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('searchValue', searchValue);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [searchValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <input
      type="text"
      className="search-input"
      value={searchValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Search character..."
      data-testid="search-input"
    />
  );
};

export default Search;
