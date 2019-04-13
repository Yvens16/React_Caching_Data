import React, { Component } from 'react';
import './App.css';
const DEFAULT_QUERY = 'Apple';

class App extends Component {
  constructor() {
    super();

    this.state= {
      results: '',
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
    };
  }
// bitcoin
  setSearchTopStories = (result) => {
    const { searchKey, results } = this.state;
    this.setState({
      results: {
        ...results,
        [searchKey]: result,
      }
      });

      console.log('results', this.state.results);
  }

  fetchStories = (searchTerm) => {
    fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&from=2019-03-13&sortBy=publishedAt&apiKey=f73c8f091bc148f9ac90d6183bcf43b5`)
    .then(res => res.json())
    .then(result => {
    this.setSearchTopStories(result.articles)
    })
    .catch(err => err);
  }

  onHandleChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    })
  }

  onHandleSubmit = event => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm })
    this.fetchStories(searchTerm);
    event.preventDefault();
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm })
    this.fetchStories(searchTerm)
  }
  render() {
    // if (!results){ return null };
    const { results } = this.state;
    if (results) {
    // console.log('In the render', this.state.results);
    return (
		<div className="App">
			<header className="App-header">
				<form onSubmit={e => this.onHandleSubmit(e)}>
					<input type="text" placeholder="Search" onChange={e => this.onHandleChange(e)} />
					<input type="submit" value="submit" />
				</form>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
	);
    } else {
      return 'hello'
    }
  }
}

export default App;
