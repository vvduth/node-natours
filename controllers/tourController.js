const Tour = require('./../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Missing name or price',
    });
  }
  next();
};
exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; // covert to number

  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour: tour,
  //   },
  // });
};

exports.createTour = (req, res) => {
  //console.log(req.body);
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTimeq);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTimeq,
    // results: tours.length,
    // data: {
    //   tours: tours,
    // },
  });
};
