import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormDataProvider } from './contexts/formDataContext';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import NoMatch from './pages/NoMatch/NoMatch';
import Header from './layout/Header/Header';
import Add from './pages/Add/Add';

const App = () => {
  return (
    <FormDataProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/add" element={<Add />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </FormDataProvider>
  );
};

export default App;
