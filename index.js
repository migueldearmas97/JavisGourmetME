require('dotenv').config();
const express = require('express');



const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el servidor express
const app = express();

//Configurar cors

app.use(cors());

//Lectura y parseo del body
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//Base de datos
dbConnection();

// Rutas
app.use('/api/users', require('./Routes/user'));
app.use('/api/meals', require('./Routes/meal'));
app.use('/api/menus', require('./Routes/menu'));
app.use('/api/offers', require('./Routes/offer'));
app.use('/api/login', require('./Routes/auth'));
app.use('/api/search', require('./Routes/search'));
app.use('/api/uploads', require('./Routes/uploads'));



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto' + process.env.PORT);
});