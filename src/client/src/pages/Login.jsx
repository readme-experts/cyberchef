import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ValidationError from '../features/ValidationError';
import { loginUser } from '../app/actions/account/loginUser';

function Login() {
  const { error } = useSelector(state => state.account);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
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
    setErrors([]);
    const validationErrors = ValidationError.validate(formData);
    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }
    dispatch(loginUser(formData));
    return navigate('/recipes');
  };
  const failedValidationStyles = {
    'outline': '1px solid red',
  };

  if (error) return <div>{ error }</div>;

  return (
    <div className='container'>
      <form action='#' className='login' onSubmit={handleSubmit}>
        <h3 className='login__heading'>Login</h3>
        <div >
          <label htmlFor='name' className='login__label'>Email</label><br />
          <input
            type='text'
            name='email'
            id='name'
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
            id='pass'
            className='login__input'
            required
            onChange={handleChange}
            style={errors.some(error => error.type === 'password') ? failedValidationStyles : {}}
          />
          {errors.some(error => error.type === 'password') ? <p style={{ 'color': 'red' }}>Invalid password</p> : <></>}
        </div>
        <Link to='/register' className='login__register'
        >Don`t have an account?</Link>
        <button type='submit' className='login__submit'>Login</button>
      </form>
    </div>);
}

export default Login;
