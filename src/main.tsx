import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { makeStore } from './redux/store';
import './index.css';

import App from './App';
import ErrorPage from './components/ErrorPage/ErrorPage';
import ReactHookForm from './components/ReactHookForm/ReactHookForm';
import UncontrolledForm from './components/UncontrolledForm/UncontrolledForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/react-hook-form',
    element: <ReactHookForm />,
  },
  {
    path: '/uncontrolled-form',
    element: <UncontrolledForm />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={makeStore()}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
