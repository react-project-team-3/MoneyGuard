import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/authValidation';
import { login } from '../../features/auth/authOperations';
import { clearError } from '../../features/auth/authSlice';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import styles from './LoginForm.module.css';
import { Link } from 'react-router-dom';
import EmailIcon from '../../assets/icons/email.svg?react';
import LockIcon from '../../assets/icons/lock.svg?react';

// use shared schema

const LoginForm = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

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

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.buttonGroup}>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Loading...' : 'Log In'}
          </Button>

          <Link to="/register">
            <Button type="button" variant="secondary">
              Register
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
