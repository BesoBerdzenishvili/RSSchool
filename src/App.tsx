import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FormDataProvider } from './contexts/formDataContext';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import NoMatch from './pages/NoMatch/NoMatch';
import Header from './layout/Header/Header';
import Form from './pages/Form/Form';

const App = () => {
  return (
    <FormDataProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/form" element={<Form />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </FormDataProvider>
  );
};

export default App;
