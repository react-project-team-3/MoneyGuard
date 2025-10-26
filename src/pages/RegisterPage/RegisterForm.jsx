import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { registerSchema } from '../../utils/authValidation';
import { register as registerUser } from '../../features/auth/authOperations';
import { clearError } from '../../features/auth/authSlice';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Loader from '../../components/Loader/Loader';
import styles from './RegisterForm.module.css';
import EmailIcon from '../../assets/icons/email.svg?react';
import LockIcon from '../../assets/icons/lock.svg?react';
import UserIcon from '../../assets/icons/user.svg?react';
import MoneyGuardIcon from '../../assets/icons/logo.svg?react';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector((state) => state.auth);
  const [isNavigating, setIsNavigating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    dispatch(clearError());
    const { confirmPassword: _, ...userData } = data;
    await dispatch(registerUser(userData));
  };

  const handleLoginClick = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate('/login');
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
          type="text"
          placeholder="Name"
          register={register('username')}
          error={errors.username?.message}
          icon={<UserIcon />}
          variant="auth"
        />

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

        <Input
          type="password"
          placeholder="Confirm password"
          register={register('confirmPassword')}
          error={errors.confirmPassword?.message}
          icon={<LockIcon />}
          variant="auth"
        />

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.buttonGroup}>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Loading...' : 'Register'}
          </Button>

          <Button 
            type="button" 
            variant="secondary" 
            disabled={loading}
            onClick={handleLoginClick}
          >
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;