 (() => {
    "use strict";

    const express = require('express'),
        app = express(),
        config = require('./config'),
        bodyParser = require('body-parser'),
        assert = require('assert'),
        mongoose = require('mongoose'),
        imageInfoRoutes = require('./routes/ImageInfos'),
        uploadRoutes = require('./routes/upload'),
        convertToPdf = require('./convertToPdf');

    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    // app.use(express.static('public'));
    // app.use(express.static('node_modules'));

    mongoose.connect(config.database, (err) => {
        assert.equal(null, err);
        console.log('Successfuly connected to ' + config.database);
    });

    app.use(express.static('public'))
    app.use('/api/v1/imageInfo', imageInfoRoutes);
    app.use('/api/v1/upload', uploadRoutes);
    app.get('/api/v1/getPDF/:email', (req, res) => {
      let email = req.params.email
      convertToPdf(email)
    })
    app.listen(config.port, () => {
        console.log("Application is running on http://localhost:" + config.port + "/");
    });
})();
