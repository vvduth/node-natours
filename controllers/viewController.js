const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour datat from collection
  const tours = await Tour.find();
  // 2) Build the template
  // 3) Render that template
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'reviews rating user'
  });
  res.status(200).render('tour', {
    title: `${tour.name}`,
    tour
  });
});
