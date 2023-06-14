import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ValidationError from '../features/ValidationError';
import { registerUser } from '../app/actions/account/registerUser';
import ErrorMessage from '../components/ErrorMessage';
import { useAppDispatch, useAppSelector } from '../app/store';
import { UserDTO } from '../services/DTO/UserDTO';


function Register() {
  const { error, user } = useAppSelector(state => state.account);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm: '',
  });
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.name]: target.value.trim(),
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = ValidationError.validate(formData);
    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }
    const dto: UserDTO = {
      username: formData.email,
      email: formData.email,
      password: formData.password,
    };
    dispatch(registerUser(dto));
  };
  const failedValidationStyles = {
    'outline': '1px solid red',
  };

  useEffect(() => {
    if (!error && user) return navigate('/recipes');
  }, [error]);

  return (
    <div className='container'>
      <form action='#' className='login' onSubmit={handleSubmit}>
        <h3 className='login__heading'>Register</h3>
        { error && <ErrorMessage error={error}></ErrorMessage>}
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
          {errors.some(error => error.type === 'email') && <p style={{ 'color': 'red' }}>Invalid email</p>}
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
          {errors.some(error => error.type === 'password') && <p style={{ 'color': 'red' }}>
            Password is shorter than 8 symbols
          </p>}
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
          {errors.some(error => error.type === 'password') && <p style={{ 'color': 'red' }}>
            Password does not match
          </p>}
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
