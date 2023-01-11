import React from 'react';
import Home from '../pages/Home';
import User from '../pages/User';
import SearchRecipes from '../pages/SearchRecipes';
import RecipePage from '../pages/RecipePage';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AppRoutes = [
  {
    path: '/',
    index: true,
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  },

];

const ProtectedAppRoutes = [
  {
    path: '/user/:id',
    element: <User/>
  },
  {
    path: '/recipes',
    element: <SearchRecipes />,
  },
  {
    path: '/recipes/:id',
    component: <RecipePage />,
  },
];

export { AppRoutes, ProtectedAppRoutes };
