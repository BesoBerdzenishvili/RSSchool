import React, { useState, useEffect } from 'react';
import './Search.css';

type PropsTypes = {
  setSearchValue: (searchValue: string) => void;
};

const Search: React.FC<PropsTypes> = ({ setSearchValue }) => {
  const [inputValue, setInputValue] = useState(() => {
    const saved = localStorage.getItem('inputValue');
    return saved ? saved : '';
  });

  useEffect(() => {
    localStorage.setItem('inputValue', inputValue);
  }, [inputValue]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('inputValue', inputValue);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [inputValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setSearchValue(inputValue);
    }
  };

  return (
    <input
      type="text"
      className="search-input"
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Search character..."
      data-testid="search-input-test"
    />
  );
};

export default Search;
