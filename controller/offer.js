const { response } = require('express');

const Offer = require('../models/offer');

const getOffer = async(req, res) => {

    const offers = await Offer.find();

    res.json({
        ok: true,
        offers
    });
}
const getOfferById = async(req, res) => {
    const id = req.params.id;

    try {
        const offer = await Offer.findById(id);

        res.json({
            ok: true,
            offer
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al localizar la oferta a editar'
        });
    }

}

const createOffer = async(req, res = response) => {

    const uid = req.uid;

    const { name } = req.body;



    try {
        const existName = await Offer.findOne({ name });
        if (existName) {
            return res.status(400).json({
                ok: false,
                msg: 'Ese nombre ya esta registrado'
            });
        }

        const offer = new Offer({
            user: uid,
            ...req.body
        });

        try {


            //Guardar oferta

            const offerDB = await offer.save();

            res.json({
                ok: true,
                offerDB,

            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error al registrar una nueva oferta hable con el administrador'
            });
        }





    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... revisar logs'
        });
    }

}


const updateOffer = async(req, res = response) => {

    // TODO: Validar token y comprobar si el usuario es correcto
    const uid = req.params.id;

    try {
        const offerDB = await Offer.findById(uid);
        if (!offerDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ninguna oferta para ese id'
            });
        }
        //Actualizando 
        const fields = req.body;
        const updatedOffer = await Offer.findByIdAndUpdate(uid, fields, { new: true });

        res.json({
            ok: true,
            user: updatedOffer
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado ... revisar logs'
        });
    }

}
const deleteOffer = async(req, res = response) => {

    // TODO: Validar token y comprobar si el usuario es correcto
    const uid = req.params.id;

    try {
        const offerDB = await Offer.findById(uid);
        try {
            //Eliminando 
            await Offer.findByIdAndDelete(uid);

            res.json({
                ok: true,
                msg: 'Oferta eliminada'

            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado ... revisar logs'
            });
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe ninguna oferta para ese id'
        });
    }


}
module.exports = {
    getOffer,
    createOffer,
    updateOffer,
    deleteOffer,
    getOfferById

}