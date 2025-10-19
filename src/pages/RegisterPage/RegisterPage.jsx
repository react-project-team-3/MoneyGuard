import RegisterForm from './RegisterForm';
import styles from './RegisterPage.module.css';
import MoneyGuardIcon from '../../assets/icons/logo.svg?react';

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoSection}>
        <div className={styles.logo}>
          <MoneyGuardIcon />
          <h1 className={styles.title}>Money Guard</h1>
        </div>
      </div>

      <div className={styles.formSection}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;