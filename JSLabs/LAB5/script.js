const http = require('http');

const HOST = 'localhost';
const PORT = 8008;

let user = { user_agent: 0 };

const server = http.createServer((req, res) => {
    switch (req.method) {
        case "GET":
            sendMessageLog(req, res)
            break;
        case "POST":
            // call post func
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

}
