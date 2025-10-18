import { useDispatch } from 'react-redux';
import { logout } from '../../../features/auth/authOperations';
import Modal from '../../UI/Modal/Modal';
import styles from './ModalLogout.module.css';
import SVGIcon from '../../../assets/icons/moneyguard.svg?react';

const ModalLogout = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  // logout
  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>
          <SVGIcon />
        </span>
        <span className={styles.logoText}>Money Guard</span>
      </div>
      <div className={styles.content}>
        <p className={styles.question}>Are you sure you want to log out?</p>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={`${styles.button} ${styles.logoutButton}`}
            onClick={handleLogout}
          >
            Log out
          </button>

          <button
            type="button"
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalLogout;
