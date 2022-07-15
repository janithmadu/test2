const express = require('express');
const { getUsers, createUsers, getSingleUser, updateUser, deleteUser } = require('../controllers/users');
const router = express.Router();

router.route('/').get(getUsers).post(createUsers);

router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
