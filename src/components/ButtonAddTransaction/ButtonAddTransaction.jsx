import styles from './ButtonAddTransaction.module.css';

const ButtonAddTransaction = ({ onClick }) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-label="Add transaction"
    >
      +
    </button>
  );
};

export default ButtonAddTransaction;