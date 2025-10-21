import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStatistics } from '../../../features/statistics/statisticsOperations';
import StatisticsChart from '../../../components/StatisticsChart/StatisticsChart';
import StatisticsTable from '../../../components/StatisticsTable/StatisticsTable';
import styles from './StatisticsTab.module.css';

const StatisticsTab = () => {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());

  useEffect(() => {
    dispatch(fetchStatistics({ month, year }));
  }, [dispatch, month, year]);

  return (
    <div className={styles.statisticsTab}>
      <h2 className={styles.title}>Statistics</h2>
      <div className={styles.controls}>
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(2000, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {Array.from({ length: 5 }, (_, i) => (
            <option key={i} value={currentDate.getFullYear() - i}>
              {currentDate.getFullYear() - i}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.content}>
        <StatisticsChart />
        <StatisticsTable />
      </div>
    </div>
  );
};

export default StatisticsTab;