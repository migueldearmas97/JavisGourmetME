const { Router } = require('express');
const { login, renewToken } = require('../controller/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password is required').not().isEmpty(),
    validarCampos,

], login);
router.get('/renew',
    validarJWT,
    renewToken
)
module.exports = router;