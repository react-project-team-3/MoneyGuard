import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from './features/auth/authOperations';
import { setAuthToken } from './api/authApi';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Loader from './components/Loader/Loader';

const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage/DashboardPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  const dispatch = useDispatch();
  const { isRefreshing, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
    dispatch(refreshUser());
  }, [dispatch, token]);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        
        <Route 
          path="/" 
          element={<Navigate to="/dashboard/home" replace />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;