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
  //   path: '/receipts',
  //   element: <Receipts />,
  // },
  // {
  //   path: '/receipts/:id',
  //   name: 'Receipt',
  //   component: <Receipt />,
  // },
];

export { AppRoutes, ProtectedAppRoutes };
