import React, { useState, useEffect } from 'react';
import './Search.css';

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState(() => {
    const saved = localStorage.getItem('searchValue');
    return saved ? saved : '';
  });

  useEffect(() => {
    localStorage.setItem('searchValue', searchValue);
  }, [searchValue]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('searchValue', JSON.stringify(searchValue));
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
      data-testid="search-input"
    />
  );
};

export default Search;
