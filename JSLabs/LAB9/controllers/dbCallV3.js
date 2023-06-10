const { generateApiKey } = require('generate-api-key');

const {
    getAllData,
    getDataById,
    insertData,
    updateData,
    deleteData,
} = require('../services/services.js');


const { ObjectId, CURSOR_FLAGS } = require('mongodb');

let dbName = "TEST"
let collection = "models"

async function getModles(req, res, next) {
    try {
        let modelsList = await getAllData(dbName, collection, { projection: { name: 1 } });
        res.send(modelsList);
    } catch (error) {
        let err = new Error();
        next(error)
    }
};

async function getModlesById(req, res, next) {
    try {
        let idValue = req.params['id'];
        let model = await getDataById(dbName, collection, { "_id": new ObjectId(idValue) });
        res.send(model);
    } catch (error) {
        let err = new Error();
        next(err)
    }
};

async function checkApiKey(req, res, next) {
    try {
        let params = req.query;
        let flag = params['newUserFlag']
        console.log(flag)
        let login = params['login'];
        //console.log(req.headers)
        console.log('aa')

        let API_key = req.headers['API-key'];
        if (API_key === undefined) {
            let result = await getDataById(dbName, 'keys', { 'username': login });
            if (result !== undefined && result !== null) {
                console.log("result")
                req.headers['API-key'] = result['key'];
                next();
            } else if (flag == 'true') {
                next();
            }
            else {
                res.status(401).send('Forbidden!');
            };
        }
    } catch (error) {
        let err = new Error();
        next(err)
    }
};

async function getNewAPI(req, res, next) {
    try {
        //let name = req.body.username
        console.log(req.body.username)
        let result = await insertData(dbName, 'keys', { "username": req.body.username, "key": generateApiKey() });
        console.log(generateApiKey())
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
}

async function addModel(req, res, next) {
    try {
        let data = req.body;
        console.log(data)
        let result = await insertData(dbName, collection, data);
        res.sendStatus(200);
    } catch (error) {
        next(error)
    }
};


async function updateModel(req, res, next) {
    try {
        let data = req.body;
        let filter = { "_id": new ObjectId(req.params['id']) };
        let update = await updateData(dbName, collection, filter, data);
        let result = await getAllData(dbName, collection);
        res.send(result);
    } catch (error) {
        let err = new Error();
        next(err)
    }
}

async function deleteModel(req, res, next) {
    try {
        let idValue = req.params['id'];
        let result = await deleteData(dbName, collection, idValue);
        res.send(result);
    } catch (error) {
        let err = new Error();
        next(err)
    }
}

async function errorCatcher(error, req, res, next) {
    res.status(500).send(`Server Error\nError: ${error}`);
};

module.exports = {
    getModles,
    getModlesById,
    checkApiKey,
    addModel,
    updateModel,
    deleteModel,
    errorCatcher,
    getNewAPI
};