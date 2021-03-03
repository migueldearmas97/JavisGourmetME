const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getOffer, createOffer, updateOffer, deleteOffer, getOfferById } = require('../controller/offer');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.get('/', getOffer);

router.get('/:id', getOfferById);



//El segundo parametro es la lista de middleware
router.post('/', [
    validarJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('price', 'The price is required').not().isEmpty(),
    validarCampos,

], createOffer);

router.put('/:id', [
    validarJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('price', 'The price is required').not().isEmpty(),
    validarCampos,


], updateOffer);
router.delete('/:id', validarJWT, deleteOffer);


module.exports = router;