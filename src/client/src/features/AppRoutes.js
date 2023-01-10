import React from 'react';
import Home from '../pages/Home';

const AppRoutes = [
  {
    path: '/',
    index: true,
    element: <Home/>
  },
  // {
  //   path: '/login',
  //   element: <Login/>
  // },
  // {
  //   path: '/register',
  //   element: <Register/>
  // },

];

const ProtectedAppRoutes = [
  // {
  //   path: '/user/:id',
  //   element: <User/>
  // },
  // {
  //   path: '/recipes',
  //   element: <SearchRecipes />,
  // },
  // {
  //   path: '/recipes/:id',
  //   component: <RecipePage />,
  // },
];

export { AppRoutes, ProtectedAppRoutes };
