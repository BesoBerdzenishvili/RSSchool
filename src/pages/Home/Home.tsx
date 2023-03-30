import { Cards } from '../../components/Cards/Cards';
import Search from '../../components/Search/Search';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Search value="" />
      <Cards />
    </div>
  );
};

export default Home;
