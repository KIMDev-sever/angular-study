"use strict";
//AWSAccessKeyId=AKIAIUNN5K2MSALBN3GA
//AWSSecretKey=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
exports.__esModule = true;
var AWS = require("aws-sdk"); // npm install --save-dev @types/aws-sdk
//////////////////////
var express = require("express");
var fs = require("fs");
var cos = require("cors");
var body_parse = require("body-parser");
var config_parms_1 = require("./config/config_parms");
var configParams = new config_parms_1.ConfigParams();
var app = express();
app.use(cos());
app.use(body_parse.json());
app.use(express.static('./public'));
////////////////////
// const awsAccessKeyId = process.env['AWSAccessKeyId'];
// const awsecretKey = process.env['AWSAccessKeyId'];
//const userpoolId=process.env['userpoolId'];
//const clientId = process.env['clientId']'
var awsAccessKeyId = 'AKIAIUNN5K2MSALBN3GA';
var awsecretKey = '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';
var clientId = '6ordo7clie48sj0fm4tc2qn26k';
var userpoolId = ' ap-northeast-2_MyPyTU0ec';
AWS.config.update({
    accessKeyId: awsAccessKeyId, secretAccessKey: awsecretKey, region: 'ap-northeast-2'
});
var s3 = new AWS.S3;
var cognito = new AWS.CognitoIdentityServiceProvider();
// exports.handler = (event: any, context) => { 
//   console.log(event)
// }
app.post('./');
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
app.post('/confirm_SignUp', function (req, res) {
    var request = req['body'];
    var data = request['body'];
    var confirmationCode = data['confirmationCode'];
    var username = data['id'];
    var params2 = configParams.getConfirmSignUpParams(username, confirmationCode, clientId);
    cognito.confirmSignUp(params2, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
            res.send({ message: 'ok' });
        }
    });
});
app.post('/sign_up', function (req, res) {
    var request = req['body'];
    if (!!request) {
        var data = request['body'];
        var params = configParams.getSignUpParams(data, clientId);
        cognito.signUp(params, function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(data);
                res.send({ message: 'ok' });
            }
        });
    }
});
app.post('/sign_up_Check', function (req, res) {
    var request = req['body'];
    var data = request['body'];
    var params = configParams.getUserParam(userpoolId, data['id'], data['name'], data['phon_number']);
    if (!!request) {
        cognito.listUsers(params, function (errors, value) {
            console.log(value);
            var cheked = false;
            if (!errors) {
                if (!!value) {
                    console.log(value);
                    // const user = value.Users?.find((value) => {
                    //   const user = value.Attributes?.find((attribute) => {
                    //     return attribute
                    //   })
                    // })
                    cheked = false;
                }
                else {
                    cheked = true;
                }
                //res.send({ cheked })
            }
        });
    }
});
app.listen(3000);
