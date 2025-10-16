import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authOperations';
import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <h1>MoneyGuard</h1>
      <button type="button" className={styles.logout} onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
