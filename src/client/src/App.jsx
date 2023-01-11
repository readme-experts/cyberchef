import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes, ProtectedAppRoutes } from './features/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './features/ProtectedRoute';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(state => state.account.user);

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
        <Route path='*' element={<p>There&amp;s nothing here: 404!</p>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
