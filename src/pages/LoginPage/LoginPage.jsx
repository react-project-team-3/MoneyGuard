import LoginForm from './LoginForm';
import styles from './LoginPage.module.css';
import MoneyGuardIcon from '../../assets/icons/logo.svg?react';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoSection}>
        <div className={styles.logo}>
          <MoneyGuardIcon />
          <h1 className={styles.title}>Money Guard</h1>
        </div>
      </div>

      <div className={styles.formSection}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;