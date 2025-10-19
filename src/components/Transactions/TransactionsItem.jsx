import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../../features/transactions/transactionsOperations';
import ModalEditTransaction from '../Modals/ModalEditTransaction/ModalEditTransaction';
import styles from './TransactionsList.module.css';

const TransactionItem = ({ transaction }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteTransaction(transaction.id));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const isIncome = transaction.type === 'INCOME';

  return (
    <>
      <tr className={styles.row}>
        <td>{formatDate(transaction.transactionDate)}</td>
        <td>
          <span className={isIncome ? styles.income : styles.expense}>
            {isIncome ? '+' : '-'}
          </span>
        </td>
        <td>{transaction.categoryId}</td>
        <td>{transaction.comment || '-'}</td>
        <td className={isIncome ? styles.amountIncome : styles.amountExpense}>
          {transaction.amount.toFixed(2)}
        </td>
        <td>
          <div className={styles.actions}>
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className={styles.editButton}
            >
              ✏️
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className={styles.deleteButton}
            >
              🗑️
            </button>
          </div>
        </td>
      </tr>

      <ModalEditTransaction
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        transaction={transaction}
      />
    </>
  );
};

export default TransactionItem;