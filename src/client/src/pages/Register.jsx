import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ValidationError from '../features/ValidationError';
import { registerUser } from '../app/actions/account/registerUser';


function Register() {
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    return navigate('/recipes');
  };
  const failedValidationStyles = {
    'outline': '1px solid red',
  };


  return (
    <div className='container'>
      <form action='#' className='login' onSubmit={handleSubmit}>
        <h3 className='login__heading'>Register</h3>
        <div>
          <label htmlFor='name' className='login__label'>Email</label><br />
          <input
            type='text'
            name='email'
            id='email'
            className='login__input'
            placeholder='example@email.com'
            required
            onChange={handleChange}
            style={errors.some(error => error.type === 'email') ? failedValidationStyles : {}}
          />
          {errors.some(error => error.type === 'email') ? <p style={{ 'color': 'red' }}>Invalid email</p> : <></>}
        </div>
        <div>
          <label htmlFor='pass' className='login__label'>Password</label><br />
          <input
            type='password'
            name='password'
            id='password'
            className='login__input'
            required
            onChange={handleChange}
            style={errors.some(error => error.type === 'password') ? failedValidationStyles : {}}
          />
          {errors.some(error => error.type === 'password') ? <p style={{ 'color': 'red' }}>
            Password is shorter than 8 symbols
          </p> : <></>}
        </div>
        <div>
          <label htmlFor='pass' className='login__label'>Confirm password</label><br />
          <input
            type='password'
            name='confirm'
            id='confirm'
            className='login__input'
            required
            onChange={handleChange}
            style={errors.some(error => error.type === 'confirm') ? failedValidationStyles : {}}
          />
          {errors.some(error => error.type === 'password') ? <p style={{ 'color': 'red' }}>
            Password does not match
          </p> : <></>}
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
