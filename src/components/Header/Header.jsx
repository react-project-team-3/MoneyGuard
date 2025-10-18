import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import ModalLogout from '../Modals/ModalLogout/ModalLogout';
import SVGIcon from '../../assets/icons/moneyguard.svg?react';
import styles from './Header.module.css';

const Header = () => {
  const { user } = useAuth();
  
  // modal state controller
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // open modal
  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  // close modal
  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const username =  user?.username || (user?.email ? user.email.split('@')[0] : 'User');

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}><SVGIcon/></span>
        <span className={styles.logoText}>Money Guard</span>
      </div>

      <div className={styles.userSection}>
        <span className={styles.username}>{username}</span>

        <button
          type="button"
          className={styles.exitButton}
          onClick={openLogoutModal}
          aria-label="Logout"
        >
          <span className={styles.exitIcon}></span>
          Exit
        </button>
      </div>

      <ModalLogout
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
      />

    </header>
  );
};

export default Header;