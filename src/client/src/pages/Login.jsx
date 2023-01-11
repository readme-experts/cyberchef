import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ValidationError from '../features/ValidationError';
import { loginUser } from '../app/actions/account/loginUser';

function Login() {
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  let formData = {
    email: '',
    password: '',
  };
  const handleChange = e => {
    formData = {
      ...formData,
      [e.target.name]: e.target.value.trim(),
    };
  };

  const handleSubmit = event => {
    event.preventDefault();
    const validationErrors = ValidationError.Validate(formData);
    if (validationErrors.length) {
      setErrors(validationErrors);
      alert(`There are form errors: ${errors.join('\n')}`);
      return;
    }
    dispatch(loginUser(formData));
    return <Navigate to='/recipes' />;
  };
  const failedValidationStyles = {
    'outline': '1px solid red',
  };


  return (
    <div className='container'>
      <form action='#' className='login' onSubmit={handleSubmit}>
        <h3 className='login__heading'>Login</h3>
        <div >
          <label htmlFor='name' className='login__label'>Email</label><br />
          <input
            type='text'
            name=''
            id='name'
            className='login__input'
            placeholder='example@email.com'
            required
            onChange={handleChange}
            style={errors.some(error => error.type === 'email') ? failedValidationStyles : {}}
          />
        </div>
        <div>
          <label htmlFor='pass' className='login__label'>Password</label><br />
          <input
            type='password'
            name=''
            id='pass'
            className='login__input'
            required
            onChange={handleChange}
            style={errors.some(error => error.type === 'password') ? failedValidationStyles : {}}
          />
        </div>
        <Link to='/register' className='login__register'
        >Don`t have an account?</Link>
        <button type='submit' className='login__submit'>Login</button>
      </form>
    </div>);
}

export default Login;
