
const fs = require('fs')

const sender = fs.readFileSync('./sms.sender','utf8').trim()
// check regex

exports.send = function(to,msg) {
  console.log('------- SMS -------')
  console.log('from:',sender)
  console.log('to:',to)
  console.log('message:',msg)
}
