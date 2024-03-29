import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ValidationError from '../features/ValidationError';
import { loginUser } from '../app/actions/account/loginUser';
import ErrorMessage from '../components/ErrorMessage';
import { useAppDispatch, useAppSelector } from '../app/store';
import { UserDTO } from '../services/DTO/UserDTO';

function Login() {
  const { error, user } = useAppSelector(state => state.account);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.name]: target.value.trim(),
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    const validationErrors = ValidationError.validate(formData);
    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }
    const dto: UserDTO = { ...formData, username: formData.email };
    dispatch(loginUser(dto));
  };
  const failedValidationStyles = {
    outline: '1px solid red',
  };

  useEffect(() => {
    if (!error && user) return navigate('/login');
  }, [error, user]);


  return (
    <div className='container'>
      <form action='#' className='login' onSubmit={handleSubmit}>
        <h3 className='login__heading'>Login</h3>
        { error && <ErrorMessage error={error} />}
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
          {errors.some(error => error.type === 'email') && <p style={{ 'color': 'red' }}>Invalid email</p>}
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
          {errors.some(error => error.type === 'password') && <p style={{ 'color': 'red' }}>Invalid password</p>}
        </div>
        <Link to='/register' className='login__register'
        >Don`t have an account?</Link>
        <button type='submit' className='login__submit'>Login</button>
      </form>
    </div>);
}

export default Login;
