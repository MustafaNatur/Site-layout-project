const express = require('express');
const v3_router = express.Router();

const {
    getModles,
    getModlesById,
    deleteModel,
    checkApiKey,
    addModel,
    updateModel,
} = require('../controllers/dbCallV3.js')

v3_router
    .get('/models', getModles)
    .get('/models/:id', getModlesById)
    .use(express.json(), checkApiKey)
    .post('/models', addModel)
    .put('/models/:id', updateModel)
    .delete('/models/:id', deleteModel);

module.exports = v3_router;


