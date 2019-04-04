#!/home/monitor/.nvm/versions/node/v10.7.0/bin/node

const fs = require('fs')
fs.writeFileSync('/run/monitor/monitor.alert.sms.pid',process.pid)

const redis = require('redis')
const db = redis.createClient()

const sms = require('./sms')

var events = require('events');
var watcher = new events.EventEmitter();

watcher.on('alert',function(message) {
  console.log('sms send',message)
  const tab = message.split('|')
  const to     = tab[0]
  const msg    = tab[1]
  console.log('send',to,msg)
  sms.send(to,msg)
})

const alerter = redis.createClient()
alerter.on('message',function(channel,message) {
  watcher.emit('alert',message)
})
alerter.subscribe('alert:sms')

