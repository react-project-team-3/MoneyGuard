import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addTransaction } from '../../../features/transactions/transactionsOperations';
import { Modal, Input, Button } from '../../UI';
import styles from './ModalAddTransaction.module.css';

const schema = yup.object({
  amount: yup
    .number()
    .positive('Amount must be positive')
    .required('Amount is required')
    .typeError('Amount must be a number'),
  transactionDate: yup.string().required('Date is required'),
  comment: yup.string().max(100, 'Comment is too long'),
  categoryId: yup.string().when('$type', {
    is: 'EXPENSE',
    then: (schema) => schema.required('Category is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const ModalAddTransaction = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.transactions);
  const [type, setType] = useState('EXPENSE');

  const incomeCategory = categories.find((cat) => cat.type === 'INCOME');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    context: { type },
    defaultValues: {
      transactionDate: new Date().toISOString().split('T')[0],
      amount: '',
      comment: '',
      categoryId: '',
    },
  });

  const onSubmit = async (data) => {
    const amount = Math.abs(Number(data.amount));

    let categoryId;
    if (type === 'INCOME') {
      categoryId = incomeCategory?.id;
      if (!categoryId) {
        alert('Income category not found. Please contact support.');
        return;
      }
    } else {
      categoryId = data.categoryId;
      if (!categoryId) {
        alert('Please select a category');
        return;
      }
    }

    const transactionData = {
      transactionDate: data.transactionDate,
      type: type,
      categoryId: categoryId,
      comment: data.comment || '',
      amount: amount,
    };

    try {
      await dispatch(addTransaction(transactionData)).unwrap();
      reset();
      onClose();
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert(`Error: ${error}`);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Transaction">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.typeSwitch}>
          <button
            type="button"
            className={type === 'INCOME' ? styles.active : ''}
            onClick={() => setType('INCOME')}
          >
            Income
          </button>
          <button
            type="button"
            className={type === 'EXPENSE' ? styles.active : ''}
            onClick={() => setType('EXPENSE')}
          >
            Expense
          </button>
        </div>

        {type === 'EXPENSE' && (
          <div className={styles.field}>
            <select
              {...register('categoryId')}
              className={styles.select}
            >
              <option value="">Select category</option>
              {categories
                .filter((cat) => cat.type === 'EXPENSE')
                .map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>
            {errors.categoryId && (
              <span className={styles.error}>{errors.categoryId.message}</span>
            )}
          </div>
        )}

        <Input
          type="number"
          step="0.01"
          placeholder="0.00"
          register={register('amount')}
          error={errors.amount?.message}
        />

        <Input
          type="date"
          register={register('transactionDate')}
          error={errors.transactionDate?.message}
        />

        <Input
          type="text"
          placeholder="Comment"
          register={register('comment')}
        />

        <div className={styles.buttons}>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add'}
          </Button>
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddTransaction;