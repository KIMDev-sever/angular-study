"use strict";
exports.__esModule = true;
var AWS = require("aws-sdk"); // npm install --save-dev @types/aws-sdk
//////////////////////
var express = require("express");
var fs = require("fs");
var cos = require("cors");
var body_parse = require("body-parser");
var config_parms_1 = require("./config/config_parms");
var globalAny = global;
globalAny.fetch = require('node-fetch');
// Modules, e.g. Webpack:
var AWSCognito = require("amazon-cognito-identity-js");
var configParams = new config_parms_1.ConfigParams();
var app = express();
app.use(cos());
app.use(body_parse.json());
app.use(express.static('./public'));
////////////////////
// const awsAccessKeyId = process.env['AWSAccessKeyId'];
// const awsecretKey = process.env['AWSAccessKeyId'];
// const userpoolId=process.env['userpoolId'];
// const clientId = process.env['clientId']
//Asdf1234@
var awsAccessKeyId = 'AKIAJYAKMPEYVDOTJ7TA';
var awsecretKey = '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';
var clientId = '6ordo7clie48sj0fm4tc2qn26k';
var userpoolId = 'ap-northeast-2_MyPyTU0ec';
AWS.config.update({
    accessKeyId: awsAccessKeyId, secretAccessKey: awsecretKey, region: 'ap-northeast-2'
});
var s3 = new AWS.S3;
var cognito = new AWS.CognitoIdentityServiceProvider();
var poolData = {
    UserPoolId: userpoolId,
    ClientId: clientId // your client id here
};
var userPool = new AWSCognito.CognitoUserPool(poolData);
//추후 lambda로 변경 예정 
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
app.post('/logout', function (req, res) {
    var _a;
    (_a = userPool.getCurrentUser()) === null || _a === void 0 ? void 0 : _a.signOut();
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
app.post('/logined', function (req, res) {
    var _a;
    if (!!userPool.getCurrentUser()) {
        (_a = userPool.getCurrentUser()) === null || _a === void 0 ? void 0 : _a.getSession(function (err, session) {
            if (!!session) {
                res.send(session.isValid());
            }
        });
    }
    else {
        res.send(false);
    }
});
app.post('/login', function (req, res) {
    var request = req['body'];
    if (!!request) {
        var data = request['body'];
        var authenticationData = {
            Username: data['id'],
            Password: data['password']
        };
        var authenticationDetails = new AWSCognito.AuthenticationDetails(authenticationData);
        var userData = {
            Username: data['id'],
            Pool: userPool
        };
        var cognitoUser = new AWSCognito.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log(result);
                res.send({ message: 'ok' });
            },
            onFailure: function (err) {
                console.log(err);
            }
        });
    }
});
app.post('/id_check', function (req, res) {
    var params = configParams.getUserParam(userpoolId);
    var request = req['body'];
    var cheked = false;
    if (!!request) {
        var data_1 = request['body'];
        cognito.listUsers(params, function (errors, value) {
            var _a;
            var user = (_a = value.Users) === null || _a === void 0 ? void 0 : _a.find(function (value) {
                return value.Username === data_1;
            });
            if (!user) {
                cheked = true;
            }
            res.send({ cheked: cheked });
        });
    }
});
app.post('/sign_up_Check', function (req, res) {
    console.log("asdasd");
    var request = req['body'];
    if (!!request) {
        var data_2 = request['body'];
        var params = configParams.getUserParam(userpoolId);
        cognito.listUsers(params, function (errors, value) {
            var _a;
            var cheked = false;
            console.log(errors);
            if (!errors) {
                if (!!value) {
                    var user = (_a = value.Users) === null || _a === void 0 ? void 0 : _a.find(function (userData) {
                        var _a, _b, _c;
                        var phone_number = (_a = userData.Attributes) === null || _a === void 0 ? void 0 : _a.find(function (attribute) {
                            return (attribute.Value === data_2['phone_number']);
                        });
                        var birthDay = (_b = userData.Attributes) === null || _b === void 0 ? void 0 : _b.find(function (attribute) {
                            return (attribute.Value === data_2['birthDay']);
                        });
                        var name = (_c = userData.Attributes) === null || _c === void 0 ? void 0 : _c.find(function (attribute) {
                            return (attribute.Value === data_2['name']);
                        });
                        return !!phone_number && !!birthDay;
                    });
                    console.log(user);
                    // 없으면 true반환
                    if (!user) {
                        cheked = true;
                    }
                }
                else {
                    cheked = true;
                }
                res.send({ cheked: cheked });
            }
        });
    }
});
app.listen(3000);
