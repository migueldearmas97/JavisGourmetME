const { response } = require('express');
const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');



const uploadsFile = async(req, res) => {

    const element = req.params.element;

    //validar que exista
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({
            ok: 'false',
            msg: 'Ningun archivo fue seleccionado para subir'
        });
    }
    //procesar la imagen  el nombre IMAGE es xq asi se definio en el postman
    const file = req.files.imagen;



    const nameCut = file.name.split('.');
    const extension = nameCut[nameCut.length - 1];

    //validar extensiones

    const extensionValid = ['jpg', 'jpeg', 'png'];

    if (!extensionValid.includes(extension)) {
        res.status(400).json({
            ok: 'false',
            msg: 'La extension del archivo no es correcta'
        });
    }

    //generar nombre del archivo
    const nameFile = `${uuidv4()}.${extension}`;

    //path para guardar la imagen 
    const path = `./uploads/meals/${nameFile}`;

    //Mover la imagen

    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                ok: 'false',
                msg: 'Error al mover la imagen'
            });
        }

    });

    // actualizar imagen

    updateImage(element, path, nameFile);

    res.json({
        ok: true,
        msg: 'Archivo subido',
        nameFile

    });
}
const getFile = async(req, res) => {

    const element = req.params.element;

    const pathImg = path.join(__dirname, `../uploads/meals/${element}`);


    //imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }




}


module.exports = {
    uploadsFile,
    getFile

}