const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWR } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { name, password } = req.body;


    try {
        //Verificar por el nombre
        const userDB = await User.findOne({ name });
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Nombre o contraseña incorrecto'
            });
        }
        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Nombre o contraseña incorrectos'
            });
        }
        //Generar el JWR

        const token = await generateJWR(userDB._id);

        res.json({
            ok: true,
            token,
            user: userDB.name,
            role: userDB.role
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... revisar logs'
        });
    }

}
const renewToken = async(req, res = response) => {

    const uid = req.uid;
    // Generar el TOKEN - JWT
    const token = await generateJWR(uid);

    //obtener usuario por el id
    const user = await User.findById(uid);


    res.json({
        ok: true,
        token,
        user
    });

}
module.exports = {
    login,
    renewToken
}