import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencyRates } from '../../features/currency/currencyOperations';
import styles from './Currency.module.css';

const Currency = () => {
  const dispatch = useDispatch();
  const { rates, isLoading, error } = useSelector((state) => state.currency);

  useEffect(() => {
    dispatch(fetchCurrencyRates());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={styles.currencyWrapper}>
        <div className={styles.loading}>Loading rates...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.currencyWrapper}>
        <div className={styles.error}>Unable to load currency rates</div>
      </div>
    );
  }

  return (
    <div className={styles.currencyWrapper}>
      <div className={styles.currencyTable}>
        <div className={styles.currencyTableHead}>
          <div className={styles.currencyItem}>Currency</div>
          <div className={styles.currencyItem}>Purchase</div>
          <div className={styles.currencyItem}>Sale</div>
        </div>

        <div className={styles.tableBody}>
          {rates.map((rate) => (
            <div key={rate.currency} className={styles.currencyTr}>
              <div className={styles.currency}>{rate.currency}</div>
              <div className={styles.currency}>{rate.purchase}</div>
              <div className={styles.currency}>{rate.sale}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.decorativeWave}>
        <svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,50 Q100,20 200,50 T400,50 L400,100 L0,100 Z"
            fill="url(#gradient)"
            opacity="0.3"
          />
          <path
            d="M0,60 Q100,35 200,60 T400,60"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6E78E8" />
              <stop offset="100%" stopColor="#9B51E0" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6E78E8" />
              <stop offset="50%" stopColor="#9B51E0" />
              <stop offset="100%" stopColor="#6E78E8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Currency;