/* eslint-disable */
import '@babel/polyfill';
import {dispalyMap} from './mapbox';
import {login} from './login';

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

dispalyMap(locations);

document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });