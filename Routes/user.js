const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsers, createUser, updateUser, deleteUser, getUserById } = require('../controller/user');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.get('/', validarJWT, getUsers);

router.get('/:id', validarJWT, getUserById);

//El segundo parametro es la lista de middleware
router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password is required').not().isEmpty(),
    validarCampos,

], createUser);

router.put('/:id', [
    validarJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('role', 'The role is required').not().isEmpty(),
    validarCampos,


], updateUser);
router.delete('/:id', validarJWT, deleteUser);


module.exports = router;