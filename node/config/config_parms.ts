import { MemberModel } from '../model/member.model';
export class ConfigParams {
    public getConfirmSignUpParams(username: string, confirmationCodes: string, clientId: string) {
        return {
            ClientId: clientId,
            ConfirmationCode: confirmationCodes,
            Username: username
        };
    };

    public getUserParam(userPoolId: string, username: string, name: string, phone_number: string) {
        return {
            Username: username,
            UserPoolId: userPoolId,
            AttributesToGet: [
                phone_number,
                name
            ],
        }
    }
    public getSignUpParams(data: MemberModel, clientId: string) {
        return {
            Password: data['password'],
            Username: data['id'],
            ClientId: clientId,
            UserAttributes:
                [
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
    }


}
