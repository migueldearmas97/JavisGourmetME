const { response } = require('express');

const Menu = require('../models/menu');

const getMenus = async(req, res) => {

    const menus = await Menu.find().populate('user', 'name');

    //para obtener solo el id y nombre 
    // const users = await User.find({}, 'name');
    res.json({
        ok: true,
        menus
    });
}
const getMenuById = async(req, res) => {
    const id = req.params.id;

    try {
        const menu = await Menu.findById(id);

        if (!menu) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al localizar el menu a editar'
            });

        } else {
            res.json({
                ok: true,
                menu
            });
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const createMenu = async(req, res = response) => {

    const uid = req.uid;

    const { name, description } = req.body;



    try {
        const existName = await Menu.findOne({ name });
        if (existName) {
            return res.status(400).json({
                ok: false,
                msg: 'Ese nombre ya esta registrado'
            });
        }

        const menu = new Menu({
            user: uid,
            ...req.body
        });

        try {


            //Guardar menu

            const menuDB = await menu.save();

            res.json({
                ok: true,
                menuDB,

            });

        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Error al registrar un nuevo menu hable con el administrador'
            });
        }





    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... revisar logs'
        });
    }

}


const updateMenu = async(req, res = response) => {

    // TODO: Validar token y comprobar si el usuario es correcto
    const uid = req.params.id;
    console.log(uid);

    try {
        const menuDB = await Menu.findById(uid);
        if (!menuDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun menu para ese id'
            });
        }
        //Actualizando 
        const fields = req.body;
        const updatedMenu = await Menu.findByIdAndUpdate(uid, fields, { new: true });

        res.json({
            ok: true,
            user: updatedMenu
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... revisar logs'
        });
    }

}
const deleteMenu = async(req, res = response) => {

    // TODO: Validar token y comprobar si el usuario es correcto
    const uid = req.params.id;

    try {
        const menuDB = await Menu.findById(uid);
        if (!menuDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun menu para ese id'
            });
        }
        //Eliminando 
        await Menu.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Menu eliminado'

        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... revisar logs'
        });
    }

}
module.exports = {
    getMenus,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu
}