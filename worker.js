const loop = require('./loop.js')
const {parentPort} = require('worker_threads')

const res = loop()
parentPort.postMessage(res)