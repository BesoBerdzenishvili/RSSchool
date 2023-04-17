import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setSearchText } from '../../redux/searchSlice';
import './Search.css';

type PropsTypes = {
  setSearchValue: (searchValue: string) => void;
};

const Search: React.FC<PropsTypes> = ({ setSearchValue }) => {
  const searchValue = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    dispatch(setSearchText(event.target.value));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setSearchValue(searchValue);
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
