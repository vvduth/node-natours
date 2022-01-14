
const express = require('express');
const {getAllUsers, creatUSer, getUser, updateUser, deleteUser} = require('./../controllers/userController')
const userRouter = express.Router() ;

userRouter
    .route('/')
    .get(getAllUsers)
    .post(creatUSer);

userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = userRouter ;