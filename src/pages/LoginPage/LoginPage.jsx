import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/auth/authOperations';
import styles from './LoginPage.module.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (result.type === 'auth/login/fulfilled') {
      navigate('/dashboard/home');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <img src="/headerlogo.png" alt="" className={styles.LoginLogo} />
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputContainer}>
              <FaEnvelope/>
              <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} required
              className={styles.formInput}
            />
            </div>
            <div className={styles.inputContainer}>
              <FaLock/>
              <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} required
              className={styles.formInput}
            />
            </div>
            <div className={styles.buttonGroup}>
              <button type="submit" disabled={isLoading} className={styles.loginBtn}>
              {isLoading ? 'Logging...' : 'Login'}
            </button>
            <button type="submit" className={styles.registerBtn}>Register</button>
            </div>
            {error && <p className={styles.error}>{error}</p>}
          </form>
      </div>
    </div>
  );
}

export default LoginPage;
