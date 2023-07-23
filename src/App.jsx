import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';

import './App.css';

// Pages import
import Home from './pages/Home';
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ViewPrompt from './pages/ViewPrompt';
import RunPrompt from './pages/RunPrompt';
import Add_EditPrompts from './pages/Add-EditPrompts';

function App() {

  const auth = useAuth();

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(auth.currentUser !== "");
  }, [auth.currentUser])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: isLogin ? <ViewPrompt /> : <Login />
        },
        {
          path: "/signup",
          element: <Register />,
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
          path: "/user",
          element: <div>USERS</div>,
          errorElement: <Error />
        },
        {
          path: "/user/add-edit",
          element: <div>Add-Edit USERS</div>,
          errorElement: <Error />
        }
      ]
    }
  ]);

  return (
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
