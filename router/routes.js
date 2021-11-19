const express = require('express');
const router = express.Router();
const {createPreference} = require('../services/MercadoPagoService');

let response = {code: 200, message: 'Ok', error: false, body: {}};
const isSandbox = false;

router.get('/', function (req, res) {
    res.render('home');
});

router.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

router.get('/success', function (req, res) {
    res.render('success', req.query);
});

router.get('/failure', function (req, res) {
    res.render('failure', req.query);
});

router.get('/pending', function (req, res) {
    res.render('pending', req.query);
});

router.post('/makepayment', function (req, res) {

    createPreference(req.body)
    .then(function(serviceResponse){
            
        response.body = serviceResponse;
        let checkout_init_point = isSandbox ? serviceResponse.sandbox_init_point : serviceResponse.init_point;  
        res.redirect(checkout_init_point);

    }).catch(function(error){

        res.redirect('/');
        console.log(error);
    });
});

router.post('/statusCallback', function (req, res) {

    console.log('Recibiendo data desde [POST]');
    console.log(`BODY: ${JSON.stringify(req.body)}`);

    res.json(response);
});



module.exports = router;
