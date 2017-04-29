/*
 * project start js
 *
 */

/**
 *  项目变量
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var config = require('./config.js');

/**
 * 设置端口和初始路径
 */
app.set('port', (process.env.PORT || 5200));
//app.use(express.static(path.join(__dirname, 'lib/')));
app.use(express.static(path.join(__dirname, 'public/')));


/**
 * 设置路由
 */
// serve the index.html page when someone visits any of the following endpoints:
//    1. /
//    2. /about
app.get(/\/(about)?$/, function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// serve up the contacts when someone visits /contacts
app.get('/contacts', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/contacts.html'));
});


// serve up the add contact
app.get('/addcontact', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/contact_add.html'));
});

// serve up the add contact
app.get('/contactmd', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/contact_manage.html'));
});


/**
 *  启动项目
 */
http.listen(app.get('port'), function() {
  console.log('listening on *:' + app.get('port'));
});

