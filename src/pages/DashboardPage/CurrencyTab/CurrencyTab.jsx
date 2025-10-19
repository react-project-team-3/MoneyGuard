import Currency from '../../../components/Currency/Currency';
import styles from './CurrencyTab.module.css';

const CurrencyTab = () => {
  return (
    <div className={styles.currencyTab}>
      <h2 className={styles.title}>Currency</h2>
      <Currency />
    </div>
  );
};

export default CurrencyTab;