import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useGetSearchQuery } from '../../redux/characterApi';
import CharacterCards from '../../components/CharacterCards/CharacterCards';
import Search from '../../components/Search/Search';
import Loading from '../../components/Loading/Loading';
import './Home.css';

const Home = () => {
  const searchText = useSelector((state: RootState) => state.search);
  const [searchValue, setSearchValue] = useState(searchText);
  const { data, isLoading, error } = useGetSearchQuery(searchValue);

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
