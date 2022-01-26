const express = require('express');

const reviewController = require('./../controllers/reviewController');

const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });
// POST /tour/213esd/reviews
// POST  /reviews
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    reviewController.createReview
  );

module.exports = router;
