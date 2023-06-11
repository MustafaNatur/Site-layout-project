const express = require('express');
const v4_router = express.Router();
const bp = require('body-parser')


const {
    getNewAPI
} = require('../controllers/dbCallV3.js')

v4_router
    .post('/newUser', getNewAPI)
    .use(bp.json())
    .use(bp.urlencoded({ extended: true }))

module.exports = v4_router;


