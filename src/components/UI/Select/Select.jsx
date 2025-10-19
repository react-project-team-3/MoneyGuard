import styles from './Select.module.css';
import clsx from 'clsx';

const Select = ({
  label,
  options,
  register,
  error,
  placeholder,
  ...rest
}) => {
  return (
    <div className={styles.selectWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      
      <select
        className={clsx(styles.select, error && styles.error)}
        {...register}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Select;