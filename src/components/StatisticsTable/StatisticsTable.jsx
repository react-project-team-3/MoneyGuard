import { useSelector } from 'react-redux';
import styles from './StatisticsTable.module.css';

const COLORS = [
  '#FED057',
  '#FFD8D0',
  '#FD9498',
  '#C5BAFF',
  '#6E78E8',
  '#4A56E2',
  '#81E1FF',
  '#24CCA7',
  '#00AD84',
];

const StatisticsTable = () => {
  const { summary } = useSelector((state) => state.statistics);

  if (!summary || !summary.categoriesSummary || summary.categoriesSummary.length === 0) {
    return <div className={styles.empty}>No data available for this period</div>;
  }

  const expenseCategories = summary.categoriesSummary.filter((cat) => cat.type === 'EXPENSE');
  const { incomeSummary, expenseSummary } = summary;

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
          {expenseCategories.map((cat, index) => (
            <tr key={cat.name}>
              <td>
                <div className={styles.categoryCell}>
                  <span
                    className={styles.colorBox}
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></span>
                  <span className={styles.categoryName}>{cat.name}</span>
                </div>
              </td>
              <td className={styles.amount}>{Math.abs(cat.total).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Expenses:</span>
          <span className={styles.expense}>{Math.abs(expenseSummary || 0).toFixed(2)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Income:</span>
          <span className={styles.income}>{Math.abs(incomeSummary || 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTable;