var express = require('express');
var router = express.Router();

var ctrlUser= require('../controllers/user');

/*User api*/
router.get('/users', ctrlUser.UserListById);//obtenemos la lista de usuarios
router.post('/users', ctrlUser.UserCreate);//crear user
router.get('/users/:userid', ctrlUser.UserReadOne);//mosrar un user en especifico
router.get('/user', ctrlUser.validToken);//mosrar un user en especifico
router.put('/users/:userid', ctrlUser.UserUpdateOne);// actualizar un user en especifico
router.delete('/users/:userid', ctrlUser.UserDeleteOne); //eliminar un user en especifico

module.exports = router;
