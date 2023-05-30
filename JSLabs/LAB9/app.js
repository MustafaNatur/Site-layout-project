const express = require('express');
const helmet = require('helmet')
const morgan = require('morgan')
const model = require('./model/model');
const v3_router = require('./routers/router3');
const HOST = model.HOST
const PORT = model.PORT;

const app = express();

app.use(express.static('public'));

app.use(morgan('dev'))

app.use(helmet())

app.use('/v3', v3_router)

app.use((req, res) => {
    res.status(404).send('Данная страница не найдена!');
});

app.use((err, req, res) => {
    res.status(500).send('Ошибка сервера')
});

app.listen(PORT, HOST, () => {

    console.log(`Сервер запущен http://${HOST}:${PORT}`);
});