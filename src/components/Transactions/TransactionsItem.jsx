import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit2 } from 'react-icons/fi';
import { deleteTransaction } from '../../features/transactions/transactionsOperations';
import { refreshUser } from '../../features/auth/authOperations';
import ModalEditTransaction from '../Modals/ModalEditTransaction/ModalEditTransaction';
import styles from './TransactionsItem.module.css';

const TransactionItem = ({ transaction }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.transactions);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await dispatch(deleteTransaction(transaction.id));
      dispatch(refreshUser());
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : '-';
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
        <td>{getCategoryName(transaction.categoryId)}</td>
        <td>{transaction.comment || '-'}</td>
        <td className={isIncome ? styles.amountIncome : styles.amountExpense}>
          {Math.abs(transaction.amount).toFixed(2)}
        </td>
        <td>
          <div className={styles.actions}>
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className={styles.editButton}
              aria-label="Edit transaction"
            >
              <FiEdit2 size={14} />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      {isEditModalOpen && createPortal(
        <ModalEditTransaction
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          transaction={transaction}
        />,
        document.body
      )}
    </>
  );
};

export default TransactionItem;