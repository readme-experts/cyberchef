import React from 'react';
import PropTypes from 'prop-types';

Search.propTypes = {
  searchCallback: PropTypes.func,
};

function Search({ searchCallback }) {
  let formData = {
    queryString: '',
  };
  const handleChange = e => {
    formData = {
      ...formData,
      [e.target.name]: e.target.value.trim(),
    };
  };

  return (
    <form className='content__filter' onSubmit={event => searchCallback(event, formData)}>
      <h3>Find recipes</h3>
      <label htmlFor='search' className='content__label'></label>
      <div>
        <input
          type='text'
          name='search'
          id='search'
          className='content__search'
          onChange={event => handleChange(event)}
        />
        <button type='submit' className='content__submit'>Search</button>
      </div>
    </form>
  );
}

export default Search;
