const MongoClient = require("mongodb").MongoClient;

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/", { monitorCommands: true });

module.exports = {
    mongoClient
};

