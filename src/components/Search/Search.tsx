import React, { useState, useEffect } from 'react';
import './Search.css';

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState(() => {
    const saved = localStorage.getItem('searchValue');
    return saved ? saved : '';
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      fetch(`https://rickandmortyapi.com/api/character?search=${searchValue}`)
        .then((response) => response.json())
        .then((data) => console.log(data.results));
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
      placeholder="Search here..."
      data-testid="search-input"
    />
  );
};

export default Search;
