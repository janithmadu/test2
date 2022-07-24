const express = require('express');
const { protect } = require('../middleware/auth');

const { getUsers, createUsers, getSingleUser, updateUser, deleteUser } = require('../controllers/users');
const router = express.Router();

router.route('/').get(protect, getUsers).post(createUsers);

//router.route('/').get(getUsers).post(createUsers);

router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
