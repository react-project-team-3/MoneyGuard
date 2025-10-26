import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BsCalendar3 } from 'react-icons/bs';
import { updateTransaction } from '../../../features/transactions/transactionsOperations';
import { refreshUser } from '../../../features/auth/authOperations';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';
import styles from './ModalEditTransaction.module.css';

const schema = yup.object({
  amount: yup
    .number()
    .positive('Amount must be positive')
    .required('Amount is required')
    .typeError('Amount must be a number'),
  transactionDate: yup.string().required('Date is required'),
  comment: yup.string().max(100, 'Comment is too long'),
});

const ModalEditTransaction = ({ isOpen, onClose, transaction }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.transactions);

  const isExpense = transaction?.type === 'EXPENSE';
  
  const getDateValue = (dateString) => {
    if (!dateString) return '';
    return dateString.split('T')[0];
  };

  const getAmountValue = (amount) => {
    return Math.abs(amount || 0);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : '';
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: getAmountValue(transaction?.amount),
      transactionDate: getDateValue(transaction?.transactionDate),
      comment: transaction?.comment || '',
    },
  });

  const onSubmit = async (data) => {
    let amount = Math.abs(Number(data.amount));
    
    if (isExpense) {
      amount = -amount;
    }

    const transactionData = {
      transactionDate: data.transactionDate,
      amount: amount,
      comment: data.comment || '',
    };

    try {
      await dispatch(updateTransaction({ 
        id: transaction.id, 
        transactionData 
      })).unwrap();
      await dispatch(refreshUser());
      onClose();
    } catch (error) {
      console.error('Error updating transaction:', error);
      alert(`Error: ${error}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit transaction">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.typeRow}>
          <span className={styles.typeLabel}>Income</span>
          <span className={styles.typeSeparator}>/</span>
          <span className={isExpense ? styles.typeActive : styles.typeLabel}>Expense</span>
        </div>

        <div className={styles.categoryRow}>
          {getCategoryName(transaction?.categoryId)}
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              className={styles.input}
              {...register('amount')}
            />
            {errors.amount && (
              <span className={styles.error}>{errors.amount.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.dateInputWrapper}>
              <input
                type="date"
                className={styles.input}
                {...register('transactionDate')}
              />
              <BsCalendar3 className={styles.calendarIcon} />
            </div>
            {errors.transactionDate && (
              <span className={styles.error}>{errors.transactionDate.message}</span>
            )}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Comment"
            className={styles.input}
            {...register('comment')}
          />
        </div>

        <div className={styles.buttons}>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEditTransaction;