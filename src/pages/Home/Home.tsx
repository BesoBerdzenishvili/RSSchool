import { useState, useEffect } from 'react';
import { useGetSearchQuery } from '../../redux/characterApi';
import CharacterCards from '../../components/CharacterCards/CharacterCards';
import Search from '../../components/Search/Search';
import Loading from '../../components/Loading/Loading';
import './Home.css';

const Home = () => {
  const [searchValue, setSearchValue] = useState(() => {
    const saved = localStorage.getItem('searchValue');
    return saved ? saved : '';
  });
  const { data, isLoading, error } = useGetSearchQuery(searchValue);

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

  return (
    <div className="home">
      <Search setSearchValue={setSearchValue} />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <p>Something went wrong...</p>
      ) : (
        <CharacterCards characters={data.results} />
      )}
    </div>
  );
};

export default Home;
