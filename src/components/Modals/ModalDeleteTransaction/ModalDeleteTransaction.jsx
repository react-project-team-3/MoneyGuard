import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../../../features/transactions/transactionsOperations';
import { refreshUser } from '../../../features/auth/authOperations';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';
import styles from './ModalDeleteTransaction.module.css';
import LogoIcon from '../../../assets/icons/logo.svg?react';

const ModalDeleteTransaction = ({ isOpen, onClose, transaction }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteTransaction(transaction.id)).unwrap();
      await dispatch(refreshUser());
      onClose();
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      alert(`Error: ${error}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <LogoIcon />
          <span className={styles.logoText}>Money Guard</span>
        </div>
        
        <p className={styles.question}>
          Are you sure you want to delete this transaction?
        </p>
        
        {transaction?.comment && (
          <p className={styles.transactionInfo}>
            "{transaction.comment}"
          </p>
        )}

        <div className={styles.buttonGroup}>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteTransaction;