const fs = require('fs');
const Meal = require('../models/meal');


const updateImage = async(element, path, nameFile) => {

    const meal = await Meal.findById(element);
    if (!meal) {
        console.log('no se encontro una comida con ese id');
        return false;
    }
    const OldPath = `./uploads/meals/${meal.img}`;
    if (fs.existsSync(OldPath)) {
        // borrar la imagen anterior
        fs.unlinkSync(OldPath);
    }
    meal.img = nameFile;

    await meal.save();
    return true;


}
module.exports = {
    updateImage
}