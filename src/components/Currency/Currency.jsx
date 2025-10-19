import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencyRates } from '../../features/currency/currencyOperations';
import styles from './Currency.module.css';

const Currency = () => {
  const dispatch = useDispatch();
  const { rates, isLoading } = useSelector((state) => state.currency);
  const error = useSelector((state) => state.currency.error);

  useEffect(() => {
    dispatch(fetchCurrencyRates());
  }, [dispatch]);

  if (isLoading) {
    return <div className={styles.currency}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.currency}>
        <p>Error: {error}</p>
        {rates && rates.length > 0 && (
          <div>
            <h4>Cached rates:</h4>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((rate) => (
                  <tr key={rate.currency}>
                    <td>{rate.currency}</td>
                    <td>{rate.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.currency}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Purchase</th>
            <th>Sale</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
            <tr key={rate.currency}>
              <td>{rate.currency}</td>
              <td>{rate.rate}</td>
              <td>{rate.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Currency;
