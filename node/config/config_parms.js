"use strict";
exports.__esModule = true;
exports.ConfigParams = void 0;
var ConfigParams = /** @class */ (function () {
    function ConfigParams() {
    }
    ConfigParams.prototype.getConfirmSignUpParams = function (username, confirmationCodes, clientId) {
        return {
            ClientId: clientId,
            ConfirmationCode: confirmationCodes,
            Username: username
        };
    };
    ;
    ConfigParams.prototype.getUserParam = function (userPoolId, username, name, phone_number) {
        return {
            Username: username,
            UserPoolId: userPoolId,
            AttributesToGet: [
                phone_number,
                name
            ]
        };
    };
    ConfigParams.prototype.getSignUpParams = function (data, clientId) {
        return {
            Password: data['password'],
            Username: data['id'],
            ClientId: clientId,
            UserAttributes: [
                {
                    Name: "email",
                    Value: data['email']
                },
                {
                    Name: "phone_number",
                    Value: data['phone_number']
                },
                {
                    Name: "birthdate",
                    Value: data['birthDay']
                }, {
                    Name: "name",
                    Value: data['name']
                }
            ]
        };
    };
    return ConfigParams;
}());
exports.ConfigParams = ConfigParams;
