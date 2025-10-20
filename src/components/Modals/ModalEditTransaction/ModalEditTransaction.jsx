import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { updateTransaction } from '../../../features/transactions/transactionsOperations';
import { Modal, Input, Button } from '../../UI';
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

  const isExpense = transaction?.type === 'EXPENSE';
  
  // ✅ Tarihi doğru formatta al (YYYY-MM-DD)
  const getDateValue = (dateString) => {
    if (!dateString) return '';
    // API'den gelen tarih "2025-10-17T00:00:00.000Z" formatında
    // Sadece YYYY-MM-DD kısmını al
    return dateString.split('T')[0];
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: Math.abs(transaction?.amount || 0),
      transactionDate: getDateValue(transaction?.transactionDate),
      comment: transaction?.comment || '',
    },
  });

  const onSubmit = async (data) => {
    let amount = Number(data.amount);
    
    if (isExpense) {
      amount = -Math.abs(amount);
    } else {
      amount = Math.abs(amount);
    }

    // ✅ Tarihi olduğu gibi gönder (YYYY-MM-DD formatında)
    const transactionData = {
      transactionDate: data.transactionDate,
      amount: amount,
      comment: data.comment || '',
    };

    console.log('Updating transaction:', transactionData);

    try {
      await dispatch(updateTransaction({ 
        id: transaction.id, 
        transactionData 
      })).unwrap();
      onClose();
    } catch (error) {
      console.error('Error updating transaction:', error);
      alert(`Error: ${error}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Transaction">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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