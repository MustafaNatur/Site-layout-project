const express = require('express');
const model = require('./model/model');
const v1_router = require('./router/router');
const HOST = model.HOST
const PORT = model.PORT;

const app = express();
app.use(express.static('public'));

app.use('/v1', v1_router);
//app.use('/v1/comments', v1_router2);

app.listen(PORT, HOST, () => {

    console.log(`Сервер запущен http://${HOST}:${PORT}`);
});

app.use((req, res) => {
    res.status(404).send('Данная страница не найдена!');
});

app.use((err, req, res) => {
    res.status(500).send('Ошибка сервера')
});