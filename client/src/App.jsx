import React, { lazy, Suspense } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.scss';
const NavBar = lazy(() => import('./MainPageComponents/Navbar/Navbar'))
const SideBar = lazy(() => import('./MainPageComponents/SideBar/SideBar'))
const Chapter = lazy(() => import('./Pages/Chapter/Chapter'))
const Course = lazy(() => import('./Pages/Course/Course'))
const Create = lazy(() => import('./Pages/Create/Create'))
const DashBoard = lazy(() => import('./Pages/DashBoard/DashBoard'))
const Home = lazy(() => import('./Pages/Home/Home'))
const LandingPage = lazy(() => import('./Pages/LandingPage/LandingPage'))
const TeacherMode = lazy(() => import('./Pages/TeacherMode/TeacherMode'))

const App = () => {

  const { user: currentUser } = useSelector(state => state.auth);


  const Layout = ({ children }) => {

    return (
      <div className='homelayout'>
        <NavBar />
        <div className='sblayout'>
          <SideBar />
          <div className='maincontent'>
            <Outlet />
          </div>
        </div>
      </div>
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
          element: <Suspense ><Home /></Suspense>
        },
        {
          path: '/course/:id',
          element: <Suspense > <Course /></Suspense>
        },
        {
          path: '/dashboard/:id',
          element: <Suspense> <DashBoard /></Suspense>
        },
        {
          path: '/teachermode',
          element: <Suspense> <TeacherMode /></Suspense>
        },
        {
          path: '/teachermode/create/:id',
          element: <Suspense><Create /></Suspense>
        },
        {
          path: '/teachermode/chaptercreate/:id',
          element: <Suspense><Chapter /></Suspense>
        }
      ]
    },
    {
      path: '/landingpage',
      element: <Suspense> <LandingPage /></Suspense>
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
