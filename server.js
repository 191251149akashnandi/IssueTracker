const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const expressEjsLayouts = require('express-ejs-layouts');

// connecting dotenv for my project 
require('dotenv').config();

// giving port
const port = process.env.port || 8000;

// my express app
const app = express();

// using cors for accessing cross origin browsers datas
app.use(cors());

// setup url encoder
app.use(express.urlencoded());

// setup layouts for express_EJS
app.use('/', expressEjsLayouts);

// accessing front-end datas and files
app.use(express.static('assets'));

// setup my view engine for front-end
app.set('view engine', 'ejs');
app.set('views', './views');

// accessing routes in app
app.use('/', require('./routers'));


// method for firing server
module.exports.startServer = async () => {
    try {
//         DataBase connection with mongoDB
        await mongoose.connect(process.env.mongoDbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected with :: MongoDB")
        
//         firing server
        app.listen(port, (err) =>{
            if(err) {
                throw new Error(err);
            }
            console.log(`${process.env.environment} server starts at port ${port}`);
        })
    } catch (error) {
        console.log('error', error);
    }
}
