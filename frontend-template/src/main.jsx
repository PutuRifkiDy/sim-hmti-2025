import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Landing from './pages/Landing';
import ProgramKerja from './pages/ProgramKerja';
import Fungsionaris from './pages/Fungsionaris';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/program-kerja',
    element: <ProgramKerja />,
  },
  {
    path: '/fungsionaris',
    element: <Fungsionaris />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
