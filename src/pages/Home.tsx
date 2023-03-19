import * as React from 'react';
import { Cards } from '../components/Cards';
import Search from '../components/Search';
import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Search />
        <Cards />
      </div>
    );
  }
}

export default Home;
