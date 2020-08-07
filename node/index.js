"use strict";
exports.__esModule = true;
var express = require("express");
var fs = require("fs");
var cos = require("cors");
var body_parse = require("body-parser");
var app = express();
app.use(cos());
app.use(body_parse.json());
app.use(express.static('./public'));
app.post('/createImg', function (req, res) {
    var request = req['body'];
    if (!!request) {
        var binaryData = Buffer.from(request['body'], 'base64');
        fs.writeFile('./public/images/' + request['fileName'], binaryData, { encoding: 'binary' }, function (value) {
            var message = value == null ? 'ok' : value;
            res.send({ message: message });
        });
    }
});
app.listen(3000);
