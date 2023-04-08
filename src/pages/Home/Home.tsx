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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character?page=1');
        const data = await response.json();
        if (data.info) {
          setCharacters(data.results);
        } else if (data.error) {
          console.log(data.error);
        }
      } catch (error) {
        console.log(error);
        setError('Something went wrong...');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      <Search setCharacters={setCharacters} setLoading={setLoading} setError={setError} />
      {loading ? <Loading /> : error ? <p>{error}</p> : <CharacterCards characters={characters} />}
    </div>
  );
};

export default Home;
