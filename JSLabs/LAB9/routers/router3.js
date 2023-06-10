const express = require('express');
const v3_router = express.Router();
const bp = require('body-parser')


const {
    getModles,
    getModlesById,
    deleteModel,
    checkApiKey,
    addModel,
    updateModel,
    getNewAPI
} = require('../controllers/dbCallV3.js')

v3_router
    .get('/models', getModles)
    .get('/models/:id', getModlesById)
    .post('/models/newUser', getNewAPI)
    .post('/models', addModel)
    .put('/models/:id', updateModel)
    .delete('/models/:id', deleteModel)
    .use(express.json(), checkApiKey)
    .use(bp.json())
    .use(bp.urlencoded({ extended: true }))



module.exports = v3_router;


