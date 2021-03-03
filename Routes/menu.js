const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getMenus, createMenu, updateMenu, deleteMenu, getMenuById } = require('../controller/menu');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.get('/', getMenus);

router.get('/:id', getMenuById);

//El segundo parametro es la lista de middleware
router.post('/', [
    validarJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    validarCampos,

], createMenu);

router.put('/:id', [
    validarJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    validarCampos,


], updateMenu);
router.delete('/:id', validarJWT, deleteMenu);


module.exports = router;