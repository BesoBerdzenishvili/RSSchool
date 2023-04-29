import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import NoMatch from './pages/NoMatch/NoMatch';
import Header from './layout/Header/Header';
import Form from './pages/Form/Form';

const App = () => {
  return (
    <div data-testid="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/form" element={<Form />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
};

export default App;
