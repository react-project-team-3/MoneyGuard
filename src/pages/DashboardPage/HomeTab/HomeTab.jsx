import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTransactions,
  fetchCategories,
} from '../../../features/transactions/transactionsOperations';
import { setAuthToken } from '../../../api/authApi';
import TransactionsList from '../../../components/Transactions/TransactionsList';
import ButtonAddTransaction from '../../../components/ButtonAddTransaction/ButtonAddTransaction';
import ModalAddTransaction from '../../../components/Modals/ModalAddTransaction/ModalAddTransaction';
import styles from './HomeTab.module.css';

const HomeTab = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      dispatch(fetchTransactions());
      dispatch(fetchCategories());
    }
  }, [dispatch, token]);

  return (
    <div className={styles.homeTab}>
      <TransactionsList />
      <ButtonAddTransaction onClick={() => setIsModalOpen(true)} />
      <ModalAddTransaction
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HomeTab;