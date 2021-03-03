const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { uploadsFile, getFile } = require('../controller/uploads');

const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();
router.use(expressFileUpload());

router.put('/:element', [
    validarJWT
], uploadsFile);
router.get('/:element', getFile);
module.exports = router;