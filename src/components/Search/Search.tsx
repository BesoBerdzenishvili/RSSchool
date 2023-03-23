import React from 'react';
import './Search.css';

interface SearchState {
  value: string;
}

class Search extends React.Component<{}, SearchState> {
  state: SearchState = { value: '' };

  componentDidMount() {
    const storedValue = localStorage.getItem('searchValue');
    if (storedValue) {
      this.setState({ value: storedValue });
    }
  }

  componentWillUnmount() {
    localStorage.setItem('searchValue', this.state.value);
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <input
        type="text"
        className="search-input"
        onChange={this.handleChange}
        value={this.state.value}
      />
    );
  }
}

export default Search;
