const express = require('express');
const helmet = require('helmet')
const morgan = require('morgan')
const model = require('./model/model');
const v3_router = require('./routers/router3');
const v4_router = require('./routers/router4');
const ErrorHandler = require('./middlewares/ErrorHandler')
const HOST = model.HOST
const PORT = model.PORT;
const bp = require('body-parser')

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./docs/api.yaml')

const cors = require('cors')



const app = express();

app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(ErrorHandler)

app.use(express.static('public'));

app.use(morgan('dev'))

app.use(helmet())

app.use(bp.json())

app.use(bp.urlencoded({ extended: true }))

app.use('/v3', v3_router)

app.use('/v4', v4_router)

app.use((req, res) => {
    res.status(404).send('Данная стsраница не найдена!');
});

app.use((err, req, res) => {
    res.status(500).send('Ошибка сервера')
});

app.listen(PORT, HOST, () => {

    console.log(`Сервер запущен http://${HOST}:${PORT}`);
});