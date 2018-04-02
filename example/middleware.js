const WiKoa =  require('../src/application')

let app = new WiKoa()

let responseData = {}

app.use(async (ctx, next) => {
    responseData.name = 'wix'
    await next()
    ctx.body = responseData
})

app.use(async (ctx, next) => {
    responseData.age = 22
    await next()
})

app.use(async (ctx, next) => {
    responseData.male = 'male'
})

app.listen(3000, () => {
    console.log('listening on 3000');
})
