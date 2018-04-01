let wiKoa = require('../src/application')

let app = new wiKoa()

// app.use(async ctx => {
//     ctx.body = 'Hello' + ctx.query.name
// })


// 拓展ctx
app.context.echoData = function (errno = 0, data = null, errmsg = '') {
    this.res.setHeader('Context-Type', 'application/json;charset=utf-8')
    this.body = {
        errno,
        data,
        errmsg
    }
}

app.use(async ctx => {
    let data = {
        name: 'WiX',
        age: 16,
        sex: 'male'
    }

    ctx.echoData(0, data, 'success')
})

app.listen(3000, () => {
    console.log('listen on 3000');
})