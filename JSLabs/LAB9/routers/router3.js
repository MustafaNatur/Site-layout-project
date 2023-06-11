const express = require('express');
const v3_router = express.Router();
const bp = require('body-parser')


const {
    getModles,
    getModlesById,
    deleteModel,
    checkApiKey,
    addModel,
    updateModel
} = require('../controllers/dbCallV3.js')

v3_router
    .use(express.json(), checkApiKey)
    .get('/models', getModles)
    .get('/models/:id', getModlesById)
    .post('/models', addModel)
    .put('/models/:id', updateModel)
    .delete('/models/:id', deleteModel)
    .use(bp.json())
    .use(bp.urlencoded({ extended: true }))


module.exports = v3_router;


