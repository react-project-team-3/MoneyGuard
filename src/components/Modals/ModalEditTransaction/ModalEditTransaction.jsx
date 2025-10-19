import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { updateTransaction } from '../../../features/transactions/transactionsOperations';
import { Modal, Input, Button } from '../../UI';
import styles from './ModalEditTransaction.module.css';

const schema = yup.object({
  amount: yup.number().positive('Amount must be positive').required('Amount is required'),
  transactionDate: yup.date().required('Date is required'),
  comment: yup.string(),
});

const ModalEditTransaction = ({ isOpen, onClose, transaction }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: transaction?.amount || 0,
      transactionDate: transaction?.transactionDate?.split('T')[0] || '',
      comment: transaction?.comment || '',
    },
  });

  const onSubmit = async (data) => {
    const transactionData = {
      ...data,
      amount: parseFloat(data.amount),
    };
    
    await dispatch(updateTransaction({ 
      id: transaction.id, 
      transactionData 
    }));
    onClose();
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
          <Button type="submit" variant="primary">Save</Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEditTransaction;