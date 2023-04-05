import React, { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import { useBeforeUnload } from 'react-router-dom';
import './Search.css';

const Search: React.FC = () => {
  const search = useRef<string>(localStorage.getItem('searchValue') || '');

  const saveSearchValueInLS = useCallback(() => {
    localStorage.setItem('searchValue', search.current);
  }, []);

  useBeforeUnload(saveSearchValueInLS);

  useEffect(() => () => saveSearchValueInLS(), [saveSearchValueInLS]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => (search.current = e.target.value);

  return (
    <input
      type="text"
      className="search-input"
      defaultValue={search.current}
      onChange={handleChange}
      data-testid="search-input"
    />
  );
};

export default Search;
