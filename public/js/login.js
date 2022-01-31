/* eslint-disable */
import axios from 'axios';
export const login = async (email, password) => {
  try {
    const res = await axios({
        method: 'POST',
        url: 'http://localhost:3000/api/v1/users/login',
        data: {
          email,
          password
        }
      });
    console.log(res.data.status);
    if (res.data.status === 'success') {
        alert('logged in successfully');
        window.setTimeout(()=> {
            location.assign('/');
        },1500);
    }
  }
  catch(err) {
    alert(err.response.data.message);
  }
};

