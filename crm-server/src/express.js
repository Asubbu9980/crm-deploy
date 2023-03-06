
const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const routes = require('./routes');

const services = require('./services');



module.exports = () => {
    for (const key in services) {
        global[key] = services[key];
    }
    const app = express();
    app.use(cookieParser());
    app.use(session({
        name: 'data',
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: (1000 * 60 * 100)
        }
    }));

    app.use(cors());
    app.use(express.json({ limit: '500mb' }));
    app.use(express.urlencoded({ extended: true, limit: '500mb' }));

    // routes
    app.use('/api/v1/health', (req, res) => {
        res.send("<h1>SERVER RUNNING!!!</h1>")
    })
    
    app.use((error, request, response, next) => {
        if (error !== null) {
            console.log(error)
            return response.json({ status: 403, message: "Invalid json" });
        }
        next(); 
    });

    app.use(fileupload());
    app.use('/api/v1', routes);
    
    app.use(express.static(path.join(_root, '../public')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(_root, '../public/index.html'));
    });


    return app
}