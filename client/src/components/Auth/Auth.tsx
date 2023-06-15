import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logUserThunk, regUserThunk } from '../../redux/thunk/user.action';
import { toast } from 'react-toastify';

export const Auth = () => {
  const dispatch = useDispatch();

  const [regForm, setRegForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    clearPassword: '',
  });

  const [filled, setFilled] = useState(true);

  const [clearPass, setClearPass] = useState(true);

  const changeForm = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const authUser = (type: string) => {
    if (type === 'reg') {
      if (!Object.values(formData).includes('')) {
        if (
          !formData.email.match(
            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
          )
        ) {
          toast.warn('Неверный формат электронной почты', {
            position: 'top-right',
            autoClose: 2500,
            hideProgressBar: true,
          });

          return;
        } else if (formData.clearPassword === formData.password) {
          dispatch(
            regUserThunk({
              name: formData.name,
              email: formData.email,
              password: formData.password,
            })
          );
        } else {
          setClearPass(false);
          toast.error('Пароли не совпадают', {
            position: 'top-right',
            autoClose: 2500,
            hideProgressBar: true,
          });
          setTimeout(() => {
            setClearPass(true);
          }, 2500);
        }
      } else {
        setFilled(false);
        setClearPass(false);
        toast.warn('Остались пустые поля', {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: true,
        });
        setTimeout(() => {
          setFilled(true);
          setClearPass(true);
        }, 2500);
      }
    } else if (type === 'log') {
      if (formData.email !== '' && formData.password !== '') {
        if (
          !formData.email.match(
            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
          )
        ) {
          toast.warn('Неверный формат электронной почты', {
            position: 'top-right',
            autoClose: 2500,
            hideProgressBar: true,
          });

          return;
        } else {
          dispatch(
            logUserThunk({
              email: formData.email,
              password: formData.password,
            })
          );
        }
      } else {
        setFilled(false);
        setClearPass(false);
        toast.warn('Остались пустые поля', {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: true,
        });
        setTimeout(() => {
          setFilled(true);
          setClearPass(true);
        }, 2500);
      }
    }
  };

  return (
    <div className="bg-white flex flex-col px-4 py-4 rounded-lg w-[300px] gap-6 border border-black">
      {regForm ? (
        <>
          <div className="text-center">Регистрация</div>
          <input
            onChange={changeForm}
            type="text"
            placeholder="имя"
            name="name"
            value={formData.name}
            className={`px-4 py-2 border ${
              filled ? 'border-black' : 'border-red-600'
            } rounded-lg `}
          />
          <input
            onChange={changeForm}
            type="text"
            placeholder="example@mail.ru"
            name="email"
            value={formData.email}
            className={`px-4 py-2 border ${
              filled ? 'border-black' : 'border-red-600'
            } rounded-lg `}
          />
          <input
            onChange={changeForm}
            type="password"
            placeholder="пароль"
            name="password"
            value={formData.password}
            className={`px-4 py-2 border ${
              clearPass ? 'border-black' : 'border-red-600'
            } rounded-lg `}
          />
          <input
            onChange={changeForm}
            type="password"
            placeholder="повторите пароль"
            name="clearPassword"
            value={formData.clearPassword}
            className={`px-4 py-2 border ${
              clearPass ? 'border-black' : 'border-red-600'
            } rounded-lg `}
          />
          <button
            onClick={() => {
              authUser('reg');
            }}
            className="btn"
          >
            Зарегистрироваться
          </button>
        </>
      ) : (
        <>
          <div className="text-center">Личный кабинет</div>
          <input
            onChange={changeForm}
            type="text"
            placeholder="example@mail.ru"
            name="email"
            value={formData.email}
            className={`px-4 py-2 border ${
              filled ? 'border-black' : 'border-red-600'
            } rounded-lg `}
          />
          <input
            onChange={changeForm}
            type="password"
            placeholder="password"
            name="password"
            value={formData.password}
            className={`px-4 py-2 border ${
              filled ? 'border-black' : 'border-red-600'
            } rounded-lg `}
          />

          <div className="flex flex-col gap-2">
            <button
              className="btn"
              onClick={() => {
                authUser('log');
              }}
            >
              Войти
            </button>
            <button className="btn" onClick={() => setRegForm(true)}>
              Нет аккаунта?
            </button>
          </div>
        </>
      )}
    </div>
  );
};
