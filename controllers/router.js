const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const AWS = require('aws-sdk');
const dotenv = require('dotenv').config();


//CONNECT TO THE PREVIOUSLY CREATED AWS S3 BUCKET
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const BUCKET_NAME = process.env.b_name;
const BUCKET_KEY = process.env.b_key;

//EXPRESS MIDDLEWARES TO HANDLE POST REQUESTS BODY
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


const listObjectsInBucket = (bucketName, key) => {
    // Create the parameters for calling listObjects
    var bucketParams = {
        Bucket : bucketName,
        Key : key
    };
  
    // Call S3 to obtain a list of the objects in the bucket
    s3.getObject(bucketParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success\n", data.Body.toString());
        }
    });
}


//GET REQUESTS

router.get('/', (req, res) => {
    res.render('welcome');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/statistics', (req, res) => {
    var bucketParams = {
        Bucket : BUCKET_NAME,
        Key : BUCKET_KEY
    };

    // Call S3 to obtain a list of the objects in the bucket
    s3.getObject(bucketParams, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data.Body.toString('utf-8'));
        }
    });
   
    //DISPLAY RESULTS IN CONSOLE AS WELL 
    listObjectsInBucket(BUCKET_NAME, BUCKET_KEY);
});


//POST REQUESTS

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username == process.env.user_name && password == process.env.user_pass) {
        res.redirect('/statistics');
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;