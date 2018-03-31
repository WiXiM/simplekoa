let wiKoa = require('../src/application')

let app = new wiKoa()

app.use(async ctx => {
    ctx.body = 'Hello' + ctx.query.name
})

app.listen(3000, () => {
    console.log('listen on 3000');
})