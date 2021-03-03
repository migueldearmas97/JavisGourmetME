const { Router } = require('express');
const { search, searchSpecific } = require('../controller/search');

const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/:element', [
    validarJWT
], search);
router.get('/:table/:element', [
    validarJWT
], searchSpecific);
module.exports = router;