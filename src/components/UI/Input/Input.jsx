import styles from './Input.module.css';
import clsx from 'clsx';

const Input = ({
  type = 'text',
  placeholder,
  error,
  icon,
  register,
  ...rest
}) => {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputContainer}>
        {icon && <span className={styles.icon}>{icon}</span>}
        
        <input
          type={type}
          placeholder={placeholder}
          className={clsx(
            styles.input,
            error && styles.error,
            icon && styles.withIcon
          )}
          {...register}
          {...rest}
        />
      </div>
      
      {error && (
        <span className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;