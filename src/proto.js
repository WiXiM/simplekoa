// context 代理更多的 req res

let proto = {}

// 为proto名为protoerty的属性设置setter
function delegateSet(params) {
    proto.__defineSetter__(name, function (val) {
        this[property][name] = val
    })
}

// 为proto名为property的属性设置getter
function delegareGet(property, name) {
    proto.__defineGetter__(name, function () {
        return this[property][name]
    })
}

// 定义 request 中要代理的 setter 和 getter
let requestSet = []
let requestGet = ['query']

// 定义 response 中要代理的 setter 和 getter
let responseSet = ['body', 'status']
let responseGet = responseSet

requestSet.forEach(ele => {
    delegateSet('request', ele)
})
requestGet.forEach(ele => {
    delegareGet('request', ele)
})
responseSet.forEach(ele => {
    delegateSet('response', ele)
})
responseGet.forEach(ele => {
    delegareGet('response', ele)
})

module.exports = proto
