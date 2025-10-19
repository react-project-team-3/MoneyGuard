import { useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styles from './StatisticsChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsChart = () => {
  const { summary } = useSelector((state) => state.statistics);

  if (!summary || !summary.categoriesSummary) {
    return <div className={styles.empty}>No data available</div>;
  }

  const data = {
    labels: summary.categoriesSummary.map((cat) => cat.name),
    datasets: [
      {
        data: summary.categoriesSummary.map((cat) => Math.abs(cat.total)),
        backgroundColor: [
          '#fed057',
          '#ffd8d0',
          '#c5baff',
          '#6e78e8',
          '#4a56e2',
          '#81e1ff',
          '#24cca7',
          '#00ad84',
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '70%',
  };

  const total = summary.expenseSummary || 0;

  return (
    <div className={styles.chart}>
      <div className={styles.doughnut}>
        <Doughnut data={data} options={options} />
        <div className={styles.center}>
          <span className={styles.total}>₴ {Math.abs(total).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsChart;