import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DetailList, ErrorPage, Main } from './components';
import App from './App';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Main />,
        children: [
          {
            path: 'detail',
            element: <DetailList />,
          },
        ],
      },
      {
        path: '/:search',
        element: <Main />,
        children: [
          {
            path: 'detail',
            element: <DetailList />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
