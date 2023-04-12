import { useState, useEffect } from 'react';
import CharacterCards from '../../components/CharacterCards/CharacterCards';
import { CharacterCardData } from '../../types/DataTypes';
import Search from '../../components/Search/Search';
import Loading from '../../components/Loading/Loading';
import './Home.css';

const Home = () => {
  const [characters, setCharacters] = useState<CharacterCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchValue, setSearchValue] = useState(() => {
    const saved = localStorage.getItem('searchValue');
    return saved ? saved : '';
  });

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${searchValue}&page=1`
        );
        const data = await response.json();
        if (data.info) {
          setCharacters(data.results);
        } else if (data.error) {
          setError(data.error);
        }
      } catch (error) {
        console.log(error);
        setError('Something went wrong...');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchValue]);

  return (
    <div className="home">
      <Search setSearchValue={setSearchValue} />
      {loading ? <Loading /> : error ? <p>{error}</p> : <CharacterCards characters={characters} />}
    </div>
  );
};

export default Home;
