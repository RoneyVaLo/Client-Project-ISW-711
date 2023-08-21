import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { useAuth } from './context/AuthContext';

import './App.css';

// Pages import
import Home from './pages/Home';
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ViewPrompt from './pages/ViewPrompt';
import RunPrompt from './pages/RunPrompt';
import Add_EditPrompts from './pages/Add-EditPrompts';
import ViewUsers from './pages/ViewUsers';
import Add_EditUsers from './pages/Add-EditUsers';
import PromptSearch from './pages/PromptSearch';
import UserVerification from './pages/UserVerification';

function App() {

  const auth = useAuth();

  const [isLogin, setIsLogin] = useState(false);


  useEffect(() => {
    setIsLogin((auth.currentUser) && (auth.currentUser !== ""));
  }, [auth.currentUser])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: isLogin ? ((auth.currentUser?.role === "admin") ? <Navigate to="/user" /> : <ViewPrompt />) : <Login />
        },
        {
          path: "/signup",
          element: isLogin ? <Navigate to="/" /> : <Register />,
          errorElement: <Error />
        },
        {
          path: "/prompt/run",
          element: isLogin ? <RunPrompt /> : <Navigate to="/" />,
          errorElement: <Error />
        },
        {
          path: "/prompt/add-edit",
          element: isLogin ? <Add_EditPrompts />: <Navigate to="/" />,
          errorElement: <Error />
        },
        {
          path: '/search',
          element: isLogin ? <PromptSearch /> : <Navigate to="/" />,
          errorElement: <Error />
        },
        {
          path: "/user",
          element: isLogin ? <ViewUsers /> : <Navigate to="/" />,
          errorElement: <Error />
        },
        {
          path: "/user/add-edit",
          element: isLogin ? <Add_EditUsers /> : <Navigate to="/" />,
          errorElement: <Error />
        }
      ]
    },
    {
      path: "/verification/:id",
      element: <UserVerification />,
      errorElement: <Error />,
    }
  ]);

  return (
    <div className='App'>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
