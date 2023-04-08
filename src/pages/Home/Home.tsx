import { useState, useEffect } from 'react';
import CharacterCards from '../../components/CharacterCards/CharacterCards';
import Search from '../../components/Search/Search';
import './Home.css';
import Loading from '../../components/Loading/Loading';

const Home = () => {
  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://rickandmortyapi.com/api/character?page=1')
      .then((response) => response.json())
      .then((data) => {
        setCharacter(data.results);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home">
      <Search />
      {loading ? <Loading /> : <CharacterCards characters={character} />}
    </div>
  );
};

export default Home;
