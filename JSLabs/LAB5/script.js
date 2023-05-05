const http = require('http');

const HOST = '127.0.0.1';
const PORT = 8008;
var commentsObj = []
var comments = []


let user = { user_agent: 0 };

const server = http.createServer((req, res) => {
    switch (req.method) {
        case "GET":
            sendMessageLog(req, res)
            break;
        case "POST":
            handlePost(req)
            break;
        default:
            break
    }
})

server.listen(PORT, HOST, () => {
    console.log(`Server is started http://${HOST}:${PORT}`)
})

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
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Main page!');
}

function sendMessageStats(req, res) {
    console.log(`${req.method} - request on /stats`);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    user.user_agent++;
    res.end(`<table>
        <tr><td>User-agent:</td>
        <td>Request:</td></tr>
        <tr><td>${req.headers['user-agent']}</td><td>${user.user_agent}</td></tr>
        </table>`);
}

function sendMessageError(req, res) {
    console.log(`${req.method} - request on unknowed path`);
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('400 Bad Request');
}

function closeServer(req, res) {
    console.log(`${req.method} - closeServer`);
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Server is closed');
    server.close()
}

function handlePost(req) {
    const chunks = [];
    req.on("data", (chunk) => {
        chunks.push(chunk);
    });
    req.on("end", () => {
        console.log("all parts/chunks have arrived");
        const data = Buffer.concat(chunks).toString();
        let obj = JSON.parse(data)
        commentsObj.push(obj)
        comments.push(obj.comment)

        console.log("Data: ", commentsObj);
    });
}

function sendMessageComents(req, res) {
    console.log(`${req.method} - get comments`);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getCommentsPage());
}

function getCommentsPage() {
    let string = "<p>Comments: </p>"
    commentsObj.forEach(i => string += `<p>${i.user}: ${i.comment}</p>`);
    return string
}



