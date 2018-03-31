let http = require('http')
let server = http.createServer((req, res) => {
    res.writeHead(200)
    res.end('Hello WiX')
})
server.listen(3000, () => {
    console.log('Listening on 3000');
})