const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getMeals, createMeal, updateMeal, deleteMeal, getMealById, getMealByName } = require('../controller/meal');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.get('/', getMeals);

router.get('/:id', getMealById);


router.get('/filter/:name', getMealByName);

//El segundo parametro es la lista de middleware
router.post('/', [
    validarJWT,

    check('name', 'The name is required.').not().isEmpty(),
    // check('img', 'The img is required').not().isEmpty(),
    check('dayOfWeek', 'The dayOfWeek is required').not().isEmpty(),
    check('ingredients', 'The ingredients is required').not().isEmpty(),
    check('menu', 'The menu not matching with mongoID').isMongoId(),

    validarCampos,

], createMeal);

router.put('/:id', [
    validarJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('img', 'The img is required').not().isEmpty(),
    check('dayOfWeek', 'The dayOfWeek is required').not().isEmpty(),
    check('ingredients', 'The ingredients is required').not().isEmpty(),
    validarCampos,


], updateMeal);
router.delete('/:id', validarJWT, deleteMeal);


module.exports = router;