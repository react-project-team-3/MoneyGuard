import { useDispatch } from 'react-redux';
import { logout } from '../../../features/auth/authOperations';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';
import styles from './ModalLogout.module.css';
import LogoIcon from '../../../assets/icons/logo.svg?react';

const ModalLogout = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <LogoIcon />
          <span className={styles.logoText}>Money Guard</span>
        </div>
        
        <p className={styles.question}>Are you sure you want to log out?</p>

        <div className={styles.buttonGroup}>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalLogout;