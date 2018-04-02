let EventEmitter = require('events')

let http = require('http')
let context = require('./proto')
// let context = require('./context')
let request = require('./request')
let response = require('./response')

class Application extends EventEmitter {
    /**
     * 构造函数
     */
    constructor() {
        super()

        this.middlewares = []
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
    // use(fn) {
    //     this.callbackFunc = fn
    // }
    /**
 * 中间件挂载
 * @param { Function } middleware 中间件函数
 */
    use(middleware) {
        this.middlewares.push(middleware)
    }

    /**
     * 中间件合并方法， 将中间件数组合并为一个中间件
     * @return { Function }
     */
    compose() {
        //将middlewares 合并为一个函数， 该函数接受一个ctx 对象
        return async ctx => {

            function createNext(middleware, lastNext) {
                return async () => {
                    await middleware(ctx, lastNext)
                }
            }

            let len = this.middlewares.length
            let next = async () => {
                return Promise.resolve()
            }

            for (let i = len - 1; i >= 0; i--) {
                let currentMiddleware = this.middlewares[i]
                next = createNext(currentMiddleware, next)
            }

            await next()
        }
    }

    /**
     * 获取 http server 所需的callback函数
     * @return { Function } fn
     */
    callback() {
        return (req, res) => {
            let ctx = this.createContext(req, res)
            let respond = () => this.responseBody(ctx)

            let onerror = (err) => this.onerror(err, ctx)

            let fn = this.compose()

            return fn(ctx)
                .then(respond)
                .catch(onerror) // 在这里catch异常，调用onerror方法处理异常
            // this.callbackFunc(ctx).then(respond)
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

    /**
     * 错误处理
     * @param {Object} err Error对象
     * @param {Object} ctx ctx实例
     */
    onerror(err, ctx) {
        if (err.code === 'ENONET') {
            ctx.status = 404
        }
        else {
            ctx.status = 400
        }
        let msg = err.message || 'Internal error'
        // 触发 error 事件
        this.emit('error', err)
    }

}

module.exports = Application
