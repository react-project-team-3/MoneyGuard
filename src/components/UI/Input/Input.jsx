import styles from './Input.module.css';
import clsx from 'clsx';

const Input = ({
  type = 'text',
  placeholder,
  error,
  icon,
  register,
  variant = 'default', // 'default' veya 'auth'
  ...rest
}) => {
  return (
    <div className={clsx(
      styles.inputWrapper,
      variant === 'auth' && styles.inputWrapperAuth
    )}>
      <div className={styles.inputContainer}>
        {icon && <span className={styles.icon}>{icon}</span>}
        
        <input
          type={type}
          placeholder={placeholder}
          className={clsx(
            styles.input,
            error && styles.error,
            icon && styles.withIcon,
            type === 'date' && styles.dateInput,
            variant === 'auth' && styles.inputAuth
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