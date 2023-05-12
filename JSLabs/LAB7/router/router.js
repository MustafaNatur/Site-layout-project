const model = require('../model/model');

const express = require('express');
const v1_router = express.Router();
const jsonParser = express.json();

var commentsObj = model.commentsObj
var comments = model.comments

let user = model.user;

v1_router.use((req, res, next) => {
    let pass = req.query['password']
    if (pass == model.adminPass) {
        next()
    } else {
        res.status(403).send("Fobidden")
    }
})

v1_router.get('/', (req, res) => {
    sendMessageLog(req, res)
});

v1_router.get('/stats', (req, res) => {
    sendMessageLog(req, res)
});


v1_router.get('/comments', (req, res) => {
    sendMessageComents(req, res)
});

v1_router.post('/comments', jsonParser, (req, res) => {
    handlePost(req, res)
});


function sendMessageLog(req, res) {
    switch (req.url) {
        case "/":
            sendMessageHome(req, res)
            break
        case "/stats":
            sendMessageStats(req, res)
            break
        case "/close":
            closeServer(req, res)
            break
        case "/comments":
            sendMessageComents(req, res)
            break
        default:
            sendMessageError(req, res)
            break
    }
}

function sendMessageHome(req, res) {
    console.log(`${req.method} - request on root path`);
    // res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.send('Main page!');
}

function sendMessageStats(req, res) {
    console.log(`${req.method} - request on /stats`);
    // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    user.user_agent++;
    res.send(`<table>
        <tr><td>User-agent:</td>
        <td>Request:</td></tr>
        <tr><td>${req.headers['user-agent']}</td><td>${user.user_agent}</td></tr>
        </table>`);
}

function sendMessageError(req, res) {
    console.log(`${req.method} - request on unknowed path`);
    //res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.send('400 Bad Request');
}

function closeServer(req, res) {
    console.log(`${req.method} - closeServer`);
    //res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.send('Server is closed');
    ///server.close()
}

function handlePost(req, res) {
    let obj = req.body
    commentsObj.push(obj)
    comments.push(obj.comment)
    console.log("Data: ", commentsObj);
    res.send(comments)

}

function sendMessageComents(req, res) {
    console.log(`${req.method} - get comments`);
    //res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.send(getCommentsPage());
}

function getCommentsPage() {
    let string = "<p>Comments: </p>"
    commentsObj.forEach(i => string += `<p>${i.user}: ${i.comment}</p>`);
    return string
}

module.exports = v1_router;