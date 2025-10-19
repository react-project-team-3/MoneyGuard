import { useSelector } from 'react-redux';
import styles from './StatisticsTable.module.css';

const StatisticsTable = () => {
  const { summary } = useSelector((state) => state.statistics);

  if (!summary || !summary.categoriesSummary) {
    return <div className={styles.empty}>No data available</div>;
  }

  const { categoriesSummary, incomeSummary, expenseSummary } = summary;

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          {categoriesSummary.map((cat) => (
            <tr key={cat.name}>
              <td>
                <span className={styles.categoryName}>{cat.name}</span>
              </td>
              <td className={styles.amount}>
                {Math.abs(cat.total).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Expenses:</span>
          <span className={styles.expense}>
            {Math.abs(expenseSummary || 0).toFixed(2)}
          </span>
        </div>
        <div className={styles.summaryRow}>
          <span>Income:</span>
          <span className={styles.income}>
            {(incomeSummary || 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTable;