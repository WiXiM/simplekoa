let http = require('http')
class Application {
    /**
     * 
     */
    constructor() {
        this.callbackFunc
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
        this.callback = fn
    }

    /**
     * 获取 http server 所需的callback函数
     * @return { Function } fn
     */
    callback() {
        return (req, res) => {
            this.callbackFunc(req, res)
        }
    }
}

module.exports = Application
