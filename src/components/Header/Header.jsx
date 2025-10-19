import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import ModalLogout from '../Modals/ModalLogout/ModalLogout';
import styles from './Header.module.css';
import LogoIcon from '../../assets/icons/logo.svg?react';
import ExitIcon from '../../assets/icons/exit.svg?react';

const Header = () => {
  const { user } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const username = user?.username || user?.email?.split('@')[0] || 'User';

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <LogoIcon />
        <span className={styles.logoText}>Money Guard</span>
      </div>

      <div className={styles.userSection}>
        <span className={styles.username}>{username}</span>
        <button
          type="button"
          className={styles.exitButton}
          onClick={() => setIsLogoutModalOpen(true)}
          aria-label="Logout"
        >
          <ExitIcon />
          <span>Exit</span>
        </button>
      </div>

      <ModalLogout isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} />
    </header>
  );
};

export default Header;
