let http = require('http')
let context = require('./context')
let request = require('./request')
let response = require('./response')

class Application {
    /**
     * 构造函数
     */
    constructor() {
        this.callbackFunc
        this.context = context
        this.request = request
        this.response = response
    }

    /**
     * 开启 http server 传入callback
     */
    listen(...args) {
        let server = http.createServer(this.callback())
        server.listen(...args)
    }

    /**
     * 挂载回掉函数
     * @param { Function } fn 回掉函数处理函数
     */
    use(fn) {
        this.callbackFunc = fn
    }

    /**
     * 获取 http server 所需的callback函数
     * @return { Function } fn
     */
    callback() {
        return (req, res) => {
            let ctx = this.createContext(req, res)
            let respond = () => this.responseBody(ctx)
            this.callbackFunc(ctx)
                .then(respond)
        }
    }

    /**
     * 构造ctx
     * @param { Object } req node 请求 实例
     * @param { Object } res node 返回 实例
     * @param { Object } ctx node 上下文 实例
     */
    createContext(req, res) {
        // 针对每个请求，都要创建ctx对象
        let ctx = Object.create(this.context)
        ctx.request = Object.create(this.request)
        ctx.response = Object.create(this.response)

        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res

        return ctx
    }

    /**
     * 对客户端消息进行回复
     * @param { Object } ctx 上下文实例
     */
    responseBody(ctx) {
        let content = ctx.body
        if (typeof content === 'string') {
            ctx.res.end(context)
        }
        else if (typeof content === 'object') {
            ctx.res.end(JSON.stringify(content))
        }
    }
}

module.exports = Application
