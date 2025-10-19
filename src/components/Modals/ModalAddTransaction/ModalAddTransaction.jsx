import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addTransaction } from '../../../features/transactions/transactionsOperations';
import { Modal, Input, Button } from '../../UI';
import styles from './ModalAddTransaction.module.css';

const schema = yup.object({
  amount: yup.number().positive('Amount must be positive').required('Amount is required'),
  transactionDate: yup.date().required('Date is required'),
  comment: yup.string(),
  categoryId: yup.string().required('Category is required'),
});

const ModalAddTransaction = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.transactions);
  const [type, setType] = useState('EXPENSE');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      transactionDate: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data) => {
    const transactionData = {
      ...data,
      type,
      amount: parseFloat(data.amount),
    };
    
    await dispatch(addTransaction(transactionData));
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Transaction">
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
            <select {...register('categoryId')} className={styles.select}>
              <option value="">Select category</option>
              {categories.map((cat) => (
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
          <Button type="submit" variant="primary">Add</Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddTransaction;