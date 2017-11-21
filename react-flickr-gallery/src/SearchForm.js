import React, { Component } from 'react';

// This component handles the searching functionality
// and dynamically displays the name of the searched topic
class SearchForm extends Component {

  // Keeps track of the currently searched topic
  state = {
    searchText: ''
  }

  // Updates the searchText in its state when the user's entering the topic
  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
  }

  // When the user submits the search field by clicking Enter,
  // this function tells the PhotoContainer to fetch the searched photos
  // and updates the PhotoContainer's title + resets the search field
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.query.value);
    this.props.onSelectTitle(this.query.value);
    e.currentTarget.reset();
  }

  // Renders the search field
  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit} >
        <input type="search"
               name="search"
               placeholder="Search"
               onChange={this.onSearchChange}
               ref={ (input) => this.query = input}
               required />
        <button type="submit" className="search-button">
          <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
      </form>
    );
  }
}

export default SearchForm;
