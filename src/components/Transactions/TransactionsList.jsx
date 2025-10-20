import { useSelector } from 'react-redux';
import TransactionItem from './TransactionsItem';
import styles from './TransactionsList.module.css';

const TransactionsList = () => {
  const { transactions, isLoading } = useSelector((state) => state.transactions);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!transactions || transactions.length === 0) {
    return <div className={styles.empty}>No transactions yet</div>;
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Comment</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;