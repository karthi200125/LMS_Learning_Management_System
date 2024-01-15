import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.scss';
import NavBar from './MainPageComponents/Navbar/Navbar';
import SideBar from './MainPageComponents/SideBar/SideBar';
import Course from './Pages/Course/Course';
import Home from './Pages/Home/Home';
import LandingPage from './Pages/LandingPage/LandingPage';
import Chapter from './Pages/Chapter/Chapter';
import TeacherMode from './Pages/TeacherMode/TeacherMode';
import DashBoard from './Pages/DashBoard/DashBoard';
import Create from './Pages/Create/Create';

const App = () => {

  const { user: currentUser } = useSelector(state => state.auth);
  const queryClient = new QueryClient();

  const Layout = ({ children }) => {

    return (
      <QueryClientProvider client={queryClient}>
        <div className='homelayout'>
          <NavBar />
          <div className='sblayout'>
            <SideBar />
            <div className='maincontent'>
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
          path: '/dashboard/:id',
          element: <DashBoard />
        },
        {
          path: '/teachermode',
          element: <TeacherMode />
        },
        {
          path: '/teachermode/create/:id',
          element: <Create />
        },
        {
          path: '/teachermode/chaptercreate/:id',
          element: <Chapter />
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
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
