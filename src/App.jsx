import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';

// Pages import
import Home from './pages/Home';
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  // TODO: Crear un contexto para saber en toda la aplicación si hay alguien logueado

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          // TODO: Validar que si está logueado permita ingresar normal y si no que lo mande al Login
          element: <Login />
        },
        {
          path: "/signup",
          element: <Register />,
          errorElement: <Error />
        }
      ]
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
