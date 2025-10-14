import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { user, token, isLoggedIn, isRefreshing, error } = useSelector(
    (state) => state.auth
  );

  return {
    user,
    token,
    isLoggedIn,
    isRefreshing,
    error,
  };
};
