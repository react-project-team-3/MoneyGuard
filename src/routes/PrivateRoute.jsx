import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/Loader/Loader';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isRefreshing } = useAuth();

  if (isRefreshing) {
    return <Loader />;
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;