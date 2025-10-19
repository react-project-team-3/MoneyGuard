import { useSelector } from 'react-redux';
import styles from './Balance.module.css';

const Balance = () => {
  const { user } = useSelector((state) => state.auth);
  const balance = user?.balance || 0;

  return (
    <div className={styles.balance}>
      <p className={styles.label}>Your balance</p>
      <p className={styles.amount}>
        ₴ {balance.toFixed(2)}
      </p>
    </div>
  );
};

export default Balance;