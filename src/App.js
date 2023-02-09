import React, { useContext } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Home from './Pages/Home/Home';
import Form from './Pages/Form/Form';
import { AuthContext } from './Context/authContext';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

function App() {
  const { currentUser } = useContext(AuthContext);

  //creating a protected route that disables the user to navigate without logging in
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />;
    }

    return children;
  };
  //Creating routes.
  //Home component is protected
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/form',
      element: <Form />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
