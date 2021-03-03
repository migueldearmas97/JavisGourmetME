const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWR } = require('../helpers/jwt');

const User = require('../models/user');

const getUsers = async(req, res) => {

    const users = await User.find();

    //para obtener solo el id y nombre 
    // const users = await User.find({}, 'name');
    res.json({
        ok: true,
        users
    });
}
const getUserById = async(req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);



        res.json({
            ok: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al localizar el usuario a editar'
        });
    }

}
const createUser = async(req, res = response) => {

    const { name, password } = req.body;


    try {
        const existName = await User.findOne({ name });
        if (existName) {
            return res.status(400).json({
                ok: false,
                msg: 'Ese nombre ya esta registrado'
            });
        }
        const user = new User(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //Guardar usuario
        await user.save();

        // Generar el JWT
        const token = await generateJWR(user._id);

        res.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... revisar logs'
        });
    }

}


const updateUser = async(req, res = response) => {

    // TODO: Validar token y comprobar si el usuario es correcto
    const uid = req.params.id;

    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario para ese id'
            });
        }
        //Actualizando 
        const fields = req.body;
        const updatedUser = await User.findByIdAndUpdate(uid, fields, { new: true });

        res.json({
            ok: true,
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... revisar logs'
        });
    }

}
const deleteUser = async(req, res = response) => {

    // TODO: Validar token y comprobar si el usuario es correcto
    const uid = req.params.id;


    try {
        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario para ese id'
            });
        }
        //Eliminando 
        await User.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'

        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... revisar logs'
        });
    }

}
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}