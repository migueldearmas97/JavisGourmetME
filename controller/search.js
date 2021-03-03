const { response } = require('express');

const Meal = require('../models/meal');
const User = require('../models/user');
const Menu = require('../models/menu');

const search = async(req, res) => {

    const element = req.params.element;

    //PAra hacer busquedas flexibles Ejemp mayusculas etc
    // const regex = new RegExp(element, 'i');

    // const menus = Menu.find({ user: regex });

    const [meals] = await Promise.all([
        Meal.find({ menu: element })

    ]);

    // const meals = await Meal.find({ menu: element });


    res.json({
        ok: true,
        meals
    });
}
const searchSpecific = async(req, res) => {

    const table = req.params.table;
    const element = req.params.element;
    let data = [];

    switch (table) {
        case 'user':
            data = await User.find({ name: element });
            break;
        case 'meal':
            data = await Meal.find({ name: element });
            break;
        case 'manu':
            data = await Menu.find({ name: element });
            break;

        default:
            res.status(400).json({
                ok: 'false',
                msg: 'La coleccion buscada no existe'
            });
    }


    res.json({
        ok: true,
        resultados: data
    });
}

module.exports = {
    search,
    searchSpecific

}