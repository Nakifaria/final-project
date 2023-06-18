import { toast } from 'react-toastify';
import { ThunkActionCreater } from '../Types/thunk.type';

import { IUserInfo, userAuth, userDelete } from '../slices/user.slice';

export const regUserThunk: ThunkActionCreater<Partial<IUserInfo>> =
  (formData) => (dispatch) => {
    const loading = toast.loading('Ждем ответ от сервера...');

    fetch('http://localhost:3000/user/registration', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData),
    })
      .then((data) => data.json())
      .then(({ auth, userInfo, msg }) => {
        if (auth) {
          dispatch(
            userAuth({
              email: userInfo.email,
              id: userInfo.id,
              name: userInfo.name,
              isAuth: true,
            })
          );
          toast.update(loading, {
            render: 'Успех!',
            type: 'success',
            isLoading: false,
            autoClose: 2000,
          });
        } else {
          toast.update(loading, {
            render: msg,
            type: 'error',
            isLoading: false,
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        toast.update(loading, {
          render: error.toString(),
          type: 'error',
          isLoading: false,
          autoClose: 2000,
        });
      });
  };

export const logUserThunk: ThunkActionCreater<Partial<IUserInfo>> =
  (formData) => (dispatch) => {
    const loading = toast.loading('Ждем ответ от сервера...');
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData),
    })
      .then((data) => data.json())
      .then(({ auth, userInfo, msg }) => {
        if (auth) {
          dispatch(
            userAuth({
              email: userInfo.email,
              id: userInfo.id,
              name: userInfo.name,
              isAuth: true,
            })
          );
          toast.update(loading, {
            render: 'Успех!',
            type: 'success',
            isLoading: false,
            autoClose: 2000,
          });
        } else {
          toast.update(loading, {
            render: msg,
            type: 'error',
            isLoading: false,
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        toast.update(loading, {
          render: error.toString(),
          type: 'error',
          isLoading: false,
          autoClose: 2000,
        });
      });
  };

export const logoutUserThunk: ThunkActionCreater = () => (dispatch) => {
  fetch('http://localhost:3000/user/logout', {
    credentials: 'include',
  })
    .then(() => dispatch(userDelete()))
    .catch(console.log);
};

export const checkSessionThunk: ThunkActionCreater = () => (dispatch) => {
  fetch('http://localhost:3000/user', {
    credentials: 'include',
  })
    .then((data) => data.json())
    .then(
      ({ session, user }) =>
        session && dispatch(userAuth({ ...user, isAuth: true }))
    );
};
