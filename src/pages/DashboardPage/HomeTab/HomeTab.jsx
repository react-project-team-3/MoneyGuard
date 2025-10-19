import { useEffect, useState } from 'react';
import { useDispatch,  } from 'react-redux'; //useSelector
import { fetchTransactions, fetchCategories } from '../../../features/transactions/transactionsOperations';
import TransactionsList from '../../../components/Transactions/TransactionsList';
import ButtonAddTransaction from '../../../components/ButtonAddTransaction/ButtonAddTransaction';
import ModalAddTransaction from '../../../components/Modals/ModalAddTransaction/ModalAddTransaction';
import styles from './HomeTab.module.css';

const HomeTab = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);

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