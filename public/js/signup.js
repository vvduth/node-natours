/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
export const signup = async (name,email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm
      }
    });
    console.log(res.data.status);
    if (res.data.status === 'success') {
      showAlert('success', 'Welcome to the gang!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

