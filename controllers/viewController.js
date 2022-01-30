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
  //const tour
  const slug = req.params.slug;
  const tour = await Tour.findOne({ slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });
  console.log('success');
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});
