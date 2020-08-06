"use strict";
exports.__esModule = true;
var express = require("express");
var fs = require("fs");
var cos = require("cors");
var body_parse = require("body-parser");
var app = express();
app.use(cos());
app.use(body_parse.json());
app.post('/createImg', function (req, res) {
    var body = req['body'];
    if (!!body) {
        var binaryData = new Buffer(body, 'base64').toString('binary');
        fs.writeFile('test.png', binaryData, { encoding: 'binary' }, function (value) {
            console.log(value);
        });
    }
});
app.listen(3000, function () {
});
