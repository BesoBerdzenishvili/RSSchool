import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import NoMatch from './pages/NoMatch/NoMatch';
import Header from './layout/Header/Header';
import Add from './pages/Add/Add';

type FormData = {
  id: string;
  img: File | undefined;
  price: number;
  priceType: string;
  showPrice: boolean;
  description: string;
  date: string;
  recieveEmails: string;
};

type State = {
  formData: FormData[];
};

class App extends React.Component<{}, State> {
  state: State = {
    formData: [],
  };

  setFormData = (data: FormData[]) => {
    this.setState({ formData: data });
  };

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/add"
            element={<Add formData={this.state.formData} setFormData={this.setFormData} />}
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
