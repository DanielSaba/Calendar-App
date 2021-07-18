const { json } = require('express');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {dbConection} = require('./database/config');

//crear servidor de express
const app=express();

//BD
dbConection();

//cors
app.use(cors());

//public
app.use(express.static('public'));

//middleware parseo body
app.use(express.json());

//rutas/////////////////
//Ruta Auth
app.use('/api/auth',require('./routes/auth'));

//Ruta Events
app.use('/api/events',require('./routes/events'));

//puesto escucha
app.listen(process.env.PORT,()=>{
    console.log(`escucha en ${process.env.PORT}`);
});

//escuhar app