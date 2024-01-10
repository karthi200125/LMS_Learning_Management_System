import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NavBar from './MainPageComponents/Navbar/Navbar';
import SideBar from './MainPageComponents/SideBar/SideBar';
import Home from './Pages/Home/Home';
import LandingPage from './Pages/LandingPage/LandingPage';
import Profile from './Pages/Profile/Profile';
import Course from './Pages/Course/Course';
import TeacherMode from './Pages/TeacherMode/TeacherMode';
import './App.scss'

const App = () => {
  const currentUser = false;

  const queryClient = new QueryClient();
  
  const Layout = ({ children }) => {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <NavBar />
          <div style={{ display: 'flex' }}>
            <SideBar />
            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/landingpage" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/course/:id',
          element: <Course />
        },
        {
          path: '/teachermode',
          element: <TeacherMode />
        },
        {
          path: '/profile/:id',
          element: <Profile />
        }
      ]
    },
    {
      path: '/landingpage',
      element: <LandingPage />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
