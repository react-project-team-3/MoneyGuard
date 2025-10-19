
import styles from './ModalEditTransaction.module.css';

const ModalEditTransaction = ({ isOpen, onClose, onSave, transaction, setTransaction }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Edit transaction</h2>

        <label>
          Type
          <select name="type" value={transaction.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label>
          Amount
          <input
            type="number"
            name="amount"
            value={transaction.amount}
            onChange={handleChange}
            placeholder="0.00"
          />
        </label>

        <label>
          Date
          <input
            type="date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
          />
        </label>

        <label>
          Note
          <input
            type="text"
            name="note"
            value={transaction.note}
            onChange={handleChange}
            placeholder="Add a note"
          />
        </label>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
          <button className={styles.save} onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditTransaction;
