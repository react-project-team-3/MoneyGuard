import styles from './ModalAddTransaction.module.css';

const ModalAddTransaction = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h3>Add transaction (placeholder)</h3>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalAddTransaction;
