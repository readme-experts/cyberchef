import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes, ProtectedAppRoutes } from './features/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './features/ProtectedRoute';
import ErrorMessage from './components/ErrorMessage';
import { useAppSelector } from './app/store';

function App() {
  const user = useAppSelector(state => state.account.user) || null;

  return (
    <div className='App'>
      <Header />
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
        {ProtectedAppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={
            <ProtectedRoute user={user}>
              {element}
            </ProtectedRoute>} />;
        })}
        <Route path='*' element={<ErrorMessage error={new Error('404! This page doesn\'t exist')}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
