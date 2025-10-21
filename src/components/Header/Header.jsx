import { useState } from 'react';
import { TbLogout } from 'react-icons/tb';
import { useAuth } from '../../hooks/useAuth';
import ModalLogout from '../Modals/ModalLogout/ModalLogout';
import styles from './Header.module.css';
import LogoIcon from '../../assets/icons/logo.svg?react';

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
          <TbLogout size={18} />
          <span>Exit</span>
        </button>
      </div>

      <ModalLogout isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} />
    </header>
  );
};

export default Header;