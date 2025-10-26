import styles from './ToggleSwitch.module.css';

const ToggleSwitch = ({ value, onChange, leftLabel = 'Income', rightLabel = 'Expense' }) => {
  const isExpense = value === 'EXPENSE';

  return (
    <div className={styles.toggleContainer}>
      <span className={`${styles.label} ${!isExpense ? styles.labelActive : ''}`}>
        {leftLabel}
      </span>
      
      <div 
        className={styles.toggleSwitch}
        onClick={() => onChange(isExpense ? 'INCOME' : 'EXPENSE')}
      >
        <div className={`${styles.toggleButton} ${isExpense ? styles.toggleButtonRight : styles.toggleButtonLeft}`}>
          <span className={styles.toggleIcon}>{isExpense ? '−' : '+'}</span>
        </div>
      </div>
      
      <span className={`${styles.label} ${isExpense ? styles.labelActive : ''}`}>
        {rightLabel}
      </span>
    </div>
  );
};

export default ToggleSwitch;