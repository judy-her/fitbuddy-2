import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import SearchExercises from './pages/SearchExercises.jsx';
import SavedExercises from './pages/SavedExercises.jsx';
import Home from './pages/Home.jsx';
// import Find2 from './pages/SearchExercises.jsx';
// import History from './pages/History.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // {
      //   path: '/find',
      //   element: <Find2 />,
      // },
      // {
      //   path: '/history',
      //   element: <History />,
      // },
      {
        path: '/search',
        element: <SearchExercises />,
      },
      {
        path: '/saved',
        element: <SavedExercises />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
