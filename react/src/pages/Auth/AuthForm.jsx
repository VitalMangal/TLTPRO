import React, {
  useEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../store/index.js';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../hooks/useContext.js';
import pages from '../../utils/pages.js';
import cn from 'classnames';

// Выделить красным поля с ошибкой
const AuthForm = () => {

  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();
  // const [authFailed, setAuthFailed] = useState(false);
  const [netError, setNetError] = useState(null);
  const feedbackClasses = cn('text-red-500', 'text-xs', 'italic', {
    hidden: !error, //&& !authFailed
  });

  const formSchema = yup.object().shape({
    email: yup.string().email().required().trim(),
    password: yup.string().required(),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      //setAuthFailed(false);
      setNetError(null);
      loginUser(values)
        .unwrap()
        .then((response) => {
          console.log(response, 'response');
          const { token, user } = response;
          const { password, ...rest } = user; // Пароль лучше хранить только в базе данных
          const newData = { token, user: rest, userLoggedIn: true };
          console.log(newData, 'newData');
          auth.logIn(newData);
          navigate(pages.main);
        })
        .catch((error) => {
          //setAuthFailed(true);
          console.log(error, 'error');
          setNetError(error.data.error);
          inputRef.current.select();
        });
    },
  });

	return (
    <form onSubmit={formik.handleSubmit} className='bg-slate-200 px-8 py-7 rounded-[10px] shadow-md w-[360px] flex flex-col gap-10'>
      <h2 className='text-2xl font-medium text-center text-zinc-900'>
        Авторизация
      </h2>
      <div className='flex flex-col gap-9 pt-8 pb-[10px]'>
        <div className='flex flex-col gap-1'>
          <label className='block text-sm text text-zinc-900'>
            Почта
          </label>
          <input
            placeholder='Почта'
            className='bg-[#C9CFD8] placeholder:text-[#888F99] text-sm text-zinc-900 pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            id="email"
            autoComplete="email"
            //isInvalid={authFailed}
            required
            ref={inputRef}
            type="email"
            disabled={isLoading}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='block text-sm text text-zinc-900'>
            Пароль
          </label>
          <input
            placeholder='Пароль'
            className='bg-[#C9CFD8] placeholder:text-[#888F99] text-sm text-zinc-900 pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
            onChange={formik.handleChange}
            value={formik.values.password}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            //isInvalid={authFailed}
            disabled={isLoading}
          />
        </div>
        {netError ? <p className={feedbackClasses}>{netError}</p> : null}        
      </div>
      <div className='block mx-auto'>
        <button 
          className='px-6 py-2 rounded-md font-medium text-base transition duration-200 bg-slate-300 text-zinc-900 hover:bg-slate-400'
          type="submit"
          disabled={isLoading}
        >
          Войти
        </button>
      </div>
    </form>
	);
};

export default AuthForm;
