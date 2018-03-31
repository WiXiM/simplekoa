let wiKoa = require('../src/application')

let app = new wiKoa()

app.use((req, res) => {
    res.writeHead(200)
    res.end('Hi~ WiX')
})

app.listen(3000, () => {
    console.log('listen on 3000');
})