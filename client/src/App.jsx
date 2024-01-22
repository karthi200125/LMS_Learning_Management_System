import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.scss';
import Pay from './Utils/Pay';
import Success from './Pages/success/success';
import LoadingPage from './Pages/LoadingPage/LoadingPage';
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

  const UnauthenticatedRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />;
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
          element: <Suspense fallback={<LoadingPage />} ><Home /></Suspense>
        },
        {
          path: '/course/:id',
          element: <Suspense fallback={<LoadingPage />}> <Course /></Suspense>
        },
        {
          path: '/dashboard/:id',
          element: <Suspense fallback={<LoadingPage />}> <DashBoard /></Suspense>
        },
        {
          path: '/teachermode',
          element: <Suspense fallback={<LoadingPage />}> <TeacherMode /></Suspense>
        },
        {
          path: '/teachermode/create/:id',
          element: <Suspense fallback={<LoadingPage />}><Create /></Suspense>
        },
        {
          path: '/teachermode/chaptercreate/:id',
          element: <Suspense fallback={<LoadingPage />}><Chapter /></Suspense>
        },
        {
          path: '/pay',
          element: <Suspense fallback={<LoadingPage />}><Pay /></Suspense>
        },
        {
          path: '/success',
          element: <Suspense fallback={<LoadingPage />}><Success /></Suspense>
        }
      ]
    },
    {
      path: '/landingpage',
      element: (
        <UnauthenticatedRoute>
          <Suspense fallback={<LoadingPage />}> <LandingPage /></Suspense>
        </UnauthenticatedRoute>
      ),
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
