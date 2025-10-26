import RegisterForm from './RegisterForm';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.formSection}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;