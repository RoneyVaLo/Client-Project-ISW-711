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
          element: <RunPrompt />,
          errorElement: <Error />
        },
        {
          path: "/prompt/add-edit",
          element: <Add_EditPrompts />,
          errorElement: <Error />
        },
        {
          path: '/search',
          element: <PromptSearch />,
          errorElement: <Error />
        },
        {
          path: "/user",
          element: <ViewUsers />,
          errorElement: <Error />
        },
        {
          path: "/user/add-edit",
          element: (auth.currentUser?.role === "admin") ? <Add_EditUsers /> : <Navigate to="/" />,
          errorElement: <Error />
        }
      ]
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
