const { mongoClient } = require("../configs/dbAccess.js");
const { ObjectId } = require('mongodb');

// const dbName = 'TEST'
// const collectionName = 'comments'

// async function connectToDB(name) {
//     let connection = await mongoClient.connect();
//     let dbObj = connection.db(name);
//     console.log("Success")
//     return dbObj
// }


// get all data from collection with projection
const getAllData = async (dbName, collectionName, projection = {}) => {
    try {
        // console.log(mongoClient);

        let connection = await mongoClient.connect();
        let dbObj = connection.db(dbName).collection(collectionName);

        console.log("success")
        return await dbObj.find({}, projection).toArray();
    }
    catch (e) {
        console.log(e)
        return -1;
    }
};

// get data by serarchParams with projection
const getDataById = async (dbName, collectionName, searchParams, projection = {}) => {
    try {
        let connection = await mongoClient.connect();
        let dbObj = connection.db(dbName).collection(collectionName);

        let arr = await dbObj.findOne(searchParams, projection);
        return arr
    }
    catch (e) {
        return -1;
    }

};

const insertData = async (dbName, collectionName, objectData) => {
    console.log("OK")
    let connection = await mongoClient.connect();
    console.log("OK")
    let dbObj = connection.db(dbName).collection(collectionName);
    console.log("OK")
    if (collectionName === 'models') {
        let date = new Date().toISOString();
        objectData['creationDate'] = date;
        objectData['lastChangesDate'] = date;
    }
    let result = await dbObj.insertOne(objectData);
    console.log("OK")
    //return await getAllData(collectionName);
};

const updateData = async (dbName, collectionName, filter, objectData) => {
    console.log(filter);
    console.log(objectData);
    let connection = await mongoClient.connect();
    let dbObj = connection.db(dbName).collection(collectionName);
    if (collectionName === 'models') {
        let date = new Date().toISOString();
        objectData['lastChangesDate'] = date;
    }
    let changes = { "$set": objectData }
    console.log(changes);
    let result = await dbObj.updateOne(filter, changes);
    return await asyncFindAllData(collectionName);
}

const deleteData = async (dbName, collectionName, idValue) => {
    let connection = await mongoClient.connect();
    let collection = connection.db(dbName).collection(collectionName);
    let arr = await collection.deleteOne({ "_id": new ObjectId(idValue) });
};

module.exports = {
    getAllData,
    getDataById,
    insertData,
    updateData,
    deleteData
};