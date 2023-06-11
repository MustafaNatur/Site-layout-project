const express = require('express');
const v3_router = express.Router();
const bp = require('body-parser')


const {
    deleteModel,
    checkApiKey,
    addModel,
    updateModel
} = require('../controllers/dbCallV3.js')

v3_router
    .use(express.json(), checkApiKey)
    .post('/postModels', addModel)
    .put('/putModels/:id', updateModel)
    .delete('/deleteModels/:id', deleteModel)
    .use(bp.json())
    .use(bp.urlencoded({ extended: true }))


module.exports = v3_router;


