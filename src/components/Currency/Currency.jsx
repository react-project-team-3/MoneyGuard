import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencyRates } from '../../features/currency/currencyOperations';
import useMedia from '../../hooks/useMedia';
import styles from './Currency.module.css';
import currencyImage from '../../assets/images/currency.png';

const Currency = () => {
  const dispatch = useDispatch();
  const { rates, isLoading } = useSelector((state) => state.currency);
  const { isDesktop } = useMedia();

  useEffect(() => {
    dispatch(fetchCurrencyRates());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={styles.currencyWrapper}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  const usdRate = rates.find((r) => r.currency === 'USD')?.rate || '0.00';
  const eurRate = rates.find((r) => r.currency === 'EUR')?.rate || '0.00';

  return (
    <div className={styles.currencyWrapper}>
      <div className={styles.currencyTable}>
        <ul className={styles.currencyTableHead}>
          <li className={styles.currencyItem}>Currency</li>
          <li className={styles.currencyItem}>Purchase</li>
          <li className={styles.currencyItem}>Sale</li>
        </ul>
        <ul className={styles.tableBody}>
          <li className={styles.currencyTr}>
            <p className={styles.currency}>USD</p>
            <p className={styles.currency}>{usdRate}</p>
            <p className={styles.currency}>{usdRate}</p>
          </li>
          <li className={styles.currencyTr}>
            <p className={styles.currency}>EUR</p>
            <p className={styles.currency}>{eurRate}</p>
            <p className={styles.currency}>{eurRate}</p>
          </li>
        </ul>
      </div>

      {isDesktop ? (
        <div className={styles.diagram}>
          <p className={styles.lowerNumber}>{usdRate}</p>
          <p className={styles.higherNumber}>{eurRate}</p>
          <img src={currencyImage} alt="Currency diagram" />
        </div>
      ) : (
        <img src={currencyImage} alt="Currency diagram" />
      )}
    </div>
  );
};

export default Currency;