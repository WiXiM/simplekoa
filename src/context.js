module.exports = {

    get query() {
        return this.resquest.query
    },

    get body() {
        return this.response.body
    },

    set body(data) {
        thos.response.body = data
    },

    get status() {
        return this.response.status
    },

    set status(statusCode) {
        this.response.status = statusCode
    }

}