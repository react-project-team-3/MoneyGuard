import LoginForm from './LoginForm';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
