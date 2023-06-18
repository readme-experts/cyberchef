import React, { useState } from 'react';

interface Props {
  searchCallback: (event: React.FormEvent<HTMLFormElement>, formData: { queryString: string }) => void
}

function Search({ searchCallback } : Props) {
  const [formData, setFormData] = useState({
    queryString: '',
  });
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.name]: target.value.trim(),
    });
  };

  return (
    <form className='content__filter' onSubmit={event => searchCallback(event, formData)}>
      <h3>Find recipes</h3>
      <label htmlFor='search' className='content__label'></label>
      <div>
        <input
          type='text'
          name='queryString'
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
