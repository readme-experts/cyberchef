import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ValidationError from '../features/ValidationError';
import { registerUser } from '../app/actions/account/registerUser';


function Register() {
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  let formData = {
    email: '',
    password: '',
    confirm: '',
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
    dispatch(registerUser({
      email: formData.email,
      password: formData.password,
    }));
    return <Navigate to='/recipes' />;
  };
  const failedValidationStyles = {
    'outline': '1px solid red',
  };


  return (
    <div className='container'>
      <form action='#' className='login' onSubmit={handleSubmit}>
        <h3 className='login__heading'>Register</h3>
        <div style={errors.some(error => error.type === 'email') ? failedValidationStyles : {}}>
          <label htmlFor='name' className='login__label'>Email</label><br />
          <input
            type='text'
            name=''
            id='name'
            className='login__input'
            placeholder='example@email.com'
            required
            onChange={handleChange}
          />
        </div>
        <div style={errors.some(error => error.type === 'password') ? failedValidationStyles : {}}>
          <label htmlFor='pass' className='login__label'>Password</label><br />
          <input
            type='password'
            name=''
            id='pass'
            className='login__input'
            required
            onChange={handleChange}
          />
        </div>
        <div style={errors.some(error => error.type === 'password') ? failedValidationStyles : {}}>
          <label htmlFor='pass' className='login__label'>Confirm password</label><br />
          <input
            type='password'
            name=''
            id='confirm'
            className='login__input'
            required
            onChange={handleChange}
          />
        </div>
        <Link to='/login' className='login__register'
        >Already have an account?</Link
        >
        <button type='submit' className='login__submit'>Register</button>
      </form>
    </div>
  );
}

export default Register;
