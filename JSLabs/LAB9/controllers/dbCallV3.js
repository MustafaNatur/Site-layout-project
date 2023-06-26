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
        next(error)
    }
};

async function getModlesById(req, res, next) {
    try {
        let idValue = req.params['id'];
        let model = await getDataById(dbName, collection, { "_id": new ObjectId(idValue) });
        res.send(model);
    } catch (error) {
        next(error)
    }
};

async function checkApiKey(req, res, next) {
    try {
        let params = req.query;

        let apiKey = params['key']
        console.log(apiKey)
        if (apiKey != undefined) {
            console.log(apiKey)

            let result = await getDataById(dbName, 'keys', { 'key': apiKey });
            if (result !== undefined && result !== null) {
                console.log('SUCCESS')
                next();
            } else {
                res.status(401).send('Forbidden!');
            }
        } else {
            res.status(401).send('Forbidden!');
        }

        // let API_key = req.headers['API-key'];
        // if (API_key === undefined) {
        //     let result = await getDataById(dbName, 'keys', { 'username': login });
        //     if (result !== undefined && result !== null) {
        //         console.log(result)
        //         req.headers['API-key'] = result['key'];
        //         next();
        //     }
        //     else {
        //         res.status(401).send('Forbidden!');
        //     };
        // }
    } catch (error) {
        next(error)
    }
};

async function getNewAPI(req, res, next) {
    try {
        console.log(req.body.username)
        let name = req.body.username
        let key = generateApiKey()
        let result = await insertData(dbName, 'keys', { "username": name, "key": key });
        res.send(key)
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
        next(error)
    }
}

async function deleteModel(req, res, next) {
    try {
        let idValue = req.params['id'];
        let result = await deleteData(dbName, collection, idValue);
        res.send(result);
    } catch (error) {
        next(error)
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