const express = require('express');
const v4_router = express.Router();
const bp = require('body-parser')


const {
    getModles,
    getModlesById,
    getNewAPI
} = require('../controllers/dbCallV3.js')

v4_router
    .post('/newUser', getNewAPI)
    .get('/models', getModles)
    .get('/models/:id', getModlesById)
    .use(bp.json())
    .use(bp.urlencoded({ extended: true }))

module.exports = v4_router;


