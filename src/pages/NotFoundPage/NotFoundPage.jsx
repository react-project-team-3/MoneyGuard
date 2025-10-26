import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import LogoIcon from '../../assets/icons/logo.svg?react';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <LogoIcon className={styles.logo} />
          <h1 className={styles.brandName}>Money Guard</h1>
        </div>

        <div className={styles.errorCode}>404</div>
        
        <h2 className={styles.title}>Page Not Found</h2>
        
        <p className={styles.message}>
          Oops! The page you're looking for doesn't exist.
          It might have been moved or deleted.
        </p>

        <Link to="/dashboard/home" className={styles.homeButton}>
          <span>Go to Home</span>
        </Link>

        <div className={styles.decorativeElements}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;