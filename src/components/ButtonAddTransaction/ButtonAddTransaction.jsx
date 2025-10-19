import styles from './ButtonAddTransaction.module.css';

const ButtonAddTransaction = ({ onClick }) => {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      + Add Transaction
    </button>
  );
};

export default ButtonAddTransaction;
