import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../utils/authValidation';
import { register as registerUser } from '../../features/auth/authOperations';
import { clearError } from '../../features/auth/authSlice';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './RegisterForm.module.css';
import { Link } from 'react-router-dom';
import EmailIcon from '../../assets/icons/email.svg?react';
import LockIcon from '../../assets/icons/lock.svg?react';
import UserIcon from '../../assets/icons/user.svg?react';
import MoneyGuardIcon from '../../assets/icons/logo.svg?react';

// use shared schema

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

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
          placeholder="Username"
          register={register('username')}
          error={errors.username?.message}
          icon={<UserIcon />}
        />

        <Input
          type="email"
          placeholder="E-mail"
          register={register('email')}
          error={errors.email?.message}
          icon={<EmailIcon />}
        />

        <Input
          type="password"
          placeholder="Password"
          register={register('password')}
          error={errors.password?.message}
          icon={<LockIcon />}
        />

        <Input
          type="password"
          placeholder="Confirm password"
          register={register('confirmPassword')}
          error={errors.confirmPassword?.message}
          icon={<LockIcon />}
        />

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.buttonGroup}>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Loading...' : 'Register'}
          </Button>

          <Link to="/login">
            <Button type="button" variant="secondary">
              Log In
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
