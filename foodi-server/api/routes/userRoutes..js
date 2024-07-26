const express = require('express');
const router = express.Router();

//get all menu items from the database
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin')
const userControllers = require('../controllers/userControllers');

router.get('/', verifyToken, verifyAdmin, userControllers.getAllUsers);
router.post('/', userControllers.createUser);
router.delete('/:id', verifyToken, verifyAdmin, userControllers.deleteUser);
router.get('/admin/:email', verifyToken, userControllers.getAdmin);
router.patch('/admin/:id', verifyToken, verifyAdmin, userControllers.makeAdmin);
module.exports = router;