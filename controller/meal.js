const { response } = require('express');

const Meal = require('../models/meal');

const getMeals = async(req, res) => {

    const meals = await Meal.find().populate('user', 'name');

    //para obtener solo el id y nombre 
    // const users = await User.find({}, 'name');
    res.json({
        ok: true,
        meals
    });
}
const getMealById = async(req, res) => {
    const id = req.params.id;
    console.log('entro al id');

    try {
        const meal = await Meal.findById(id);

        res.json({
            ok: true,
            meal
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al localizar el plato a editar'
        });
    }

}
const getMealByName = async(req, res) => {
    const name = req.params.name;
    console.log('entro al nombre');

    try {
        const meal = await Meal.findOne({ name });
        if (!meal) {
            return res.status(400).json({
                ok: false,
                msg: 'Ese nombre no esta registrado'
            });
        } else {
            res.json({
                ok: true,
                meal
            });
        }


    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Ese nombre no esta registrado'
        });
    }

}
const createMeal = async(req, res = response) => {

    const uid = req.uid;
    const { name } = req.body;


    try {
        const existName = await Meal.findOne({ name });
        if (existName) {
            return res.status(400).json({
                ok: false,
                msg: 'Ese nombre ya esta registrado'
            });
        }

        const meal = new Meal({
            user: uid,
            ...req.body
        });

        // const meal = new Meal(req.body);



        try {


            //Guardar plato

            const mealDB = await meal.save();

            res.json({
                ok: true,
                mealDB,

            });

        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Error al registrar un nuevo plato hable con el administrador'
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... revisar logs'
        });
    }

}


const updateMeal = async(req, res = response) => {

    // TODO: Validar token y comprobar si el usuario es correcto
    const uid = req.params.id;

    try {
        const mealDB = await Meal.findById(uid);
        if (!mealDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun plato para ese id'
            });
        }
        //Actualizando 
        const fields = req.body;
        const updatedMeal = await Meal.findByIdAndUpdate(uid, fields, { new: true });

        res.json({
            ok: true,
            user: updatedMeal
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... revisar logs'
        });
    }

}
const deleteMeal = async(req, res = response) => {

    // TODO: Validar token y comprobar si el usuario es correcto
    const uid = req.params.id;

    try {
        const mealDB = await Meal.findById(uid);
        if (!mealDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun plato para ese id'
            });
        }
        //Eliminando 
        await Meal.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Plato eliminado'

        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... revisar logs'
        });
    }

}
module.exports = {
    getMeals,
    getMealById,
    getMealByName,
    createMeal,
    updateMeal,
    deleteMeal
}