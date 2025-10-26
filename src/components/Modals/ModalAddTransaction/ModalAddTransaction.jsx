import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BsCalendar3 } from 'react-icons/bs';
import { addTransaction } from '../../../features/transactions/transactionsOperations';
import { refreshUser } from '../../../features/auth/authOperations';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';
import ToggleSwitch from '../../UI/ToggleSwitch/ToggleSwitch';
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
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
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

  const selectedCategoryId = watch('categoryId');

  useEffect(() => {
    reset({
      transactionDate: new Date().toISOString().split('T')[0],
      amount: '',
      comment: '',
      categoryId: '',
    });
  }, [type, reset]);

  const onSubmit = async (data) => {
    let amount = Math.abs(Number(data.amount));
    
    if (type === 'EXPENSE') {
      amount = -amount;
    }

    let categoryId;
    if (type === 'INCOME') {
      const incomeCategory = categories.find((cat) => cat.type === 'INCOME');
      categoryId = incomeCategory?.id;
      
      if (!categoryId) {
        alert('Income category not found.');
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
      await dispatch(refreshUser());
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

  const expenseCategories = categories.filter((cat) => cat.type === 'EXPENSE');
  const selectedCategory = expenseCategories.find(cat => cat.id === selectedCategoryId);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add transaction">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <ToggleSwitch value={type} onChange={setType} />

        {type === 'EXPENSE' && (
          <div className={styles.selectWrapper}>
            <div 
              className={`${styles.selectTrigger} ${isSelectOpen ? styles.selectTriggerOpen : ''}`}
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              <span className={selectedCategory ? styles.selectedText : styles.placeholderText}>
                {selectedCategory ? selectedCategory.name : 'Select a category'}
              </span>
              <svg 
                className={`${styles.selectArrow} ${isSelectOpen ? styles.selectArrowOpen : ''}`}
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>

            {isSelectOpen && (
              <div className={styles.selectDropdown}>
                {expenseCategories.map((cat) => (
                  <div
                    key={cat.id}
                    className={`${styles.selectOption} ${selectedCategoryId === cat.id ? styles.selectOptionSelected : ''}`}
                    onClick={() => {
                      setValue('categoryId', cat.id);
                      setIsSelectOpen(false);
                    }}
                  >
                    {cat.name}
                  </div>
                ))}
              </div>
            )}
            {errors.categoryId && (
              <span className={styles.error}>{errors.categoryId.message}</span>
            )}
          </div>
        )}

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