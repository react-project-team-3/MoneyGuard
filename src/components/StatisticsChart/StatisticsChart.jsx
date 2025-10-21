import { useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styles from './StatisticsChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

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

const StatisticsChart = () => {
  const { summary } = useSelector((state) => state.statistics);

  if (!summary || !summary.categoriesSummary || summary.categoriesSummary.length === 0) {
    return <div className={styles.empty}>No data available for this period</div>;
  }

  const expenseCategories = summary.categoriesSummary.filter((cat) => cat.type === 'EXPENSE');

  if (expenseCategories.length === 0) {
    return <div className={styles.empty}>No expenses for this period</div>;
  }

  const data = {
    labels: expenseCategories.map((cat) => cat.name),
    datasets: [
      {
        data: expenseCategories.map((cat) => Math.abs(cat.total)),
        backgroundColor: COLORS,
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: function (context) {
            const value = context.parsed;
            return `₴ ${value.toFixed(2)}`;
          },
        },
      },
    },
    cutout: '70%',
  };

  const total = Math.abs(summary.expenseSummary || 0);

  return (
    <div className={styles.chart}>
      <div className={styles.doughnut}>
        <Doughnut data={data} options={options} />
        <div className={styles.center}>
          <span className={styles.total}>₴ {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsChart;