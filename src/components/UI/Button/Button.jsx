import styles from './Button.module.css';
import clsx from 'clsx';

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  className,
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(styles.button, styles[variant], disabled && styles.disabled, className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
