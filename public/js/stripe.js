/* eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51KPOjRCpGAJrQNJzKUGOtQxEmXbFQfrx7iLV0O1awlJoODJpqYSP7Qznx5Zr5gDLw1FrBpUyf2XomBrA9lO6bT8H00EvT3Go2x'
);
export const bookTour = async tourId => {
  try {
    //1) Get checkout session form API
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    //2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
