import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../../utils/authValidation';
import { login } from '../../features/auth/authOperations';
import { clearError } from '../../features/auth/authSlice';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Loader from '../../components/Loader/Loader';
import styles from './LoginForm.module.css';
import EmailIcon from '../../assets/icons/email.svg?react';
import LockIcon from '../../assets/icons/lock.svg?react';
import MoneyGuardIcon from '../../assets/icons/logo.svg?react';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector((state) => state.auth);
  const [isNavigating, setIsNavigating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    dispatch(clearError());
    await dispatch(login(data));
  };

  const handleRegisterClick = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate('/register');
    }, 100);
  };

  const loading = isLoading || isSubmitting;

  if (isNavigating) {
    return <Loader />;
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.logoSection}>
        <div className={styles.logo}>
          <MoneyGuardIcon />
          <h1 className={styles.title}>Money Guard</h1>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          type="email"
          placeholder="E-mail"
          register={register('email')}
          error={errors.email?.message}
          icon={<EmailIcon />}
          variant="auth"
        />

        <Input
          type="password"
          placeholder="Password"
          register={register('password')}
          error={errors.password?.message}
          icon={<LockIcon />}
          variant="auth"
        />

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.buttonGroup}>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Loading...' : 'Log In'}
          </Button>

          <Button 
            type="button" 
            variant="secondary" 
            disabled={loading}
            onClick={handleRegisterClick}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;