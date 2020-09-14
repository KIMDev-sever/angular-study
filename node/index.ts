import * as AWS from 'aws-sdk'; // npm install --save-dev @types/aws-sdk
//////////////////////
import express = require('express');
import fs = require('fs');
import cos = require('cors');
import body_parse = require('body-parser');
import { MemberModel } from './model/member.model'

import { ConfigParams } from './config/config_parms';
import * as fetch from 'node-fetch';
const globalAny: any = global;
globalAny.fetch = require('node-fetch');
// Modules, e.g. Webpack:
import * as AWSCognito from 'amazon-cognito-identity-js';

const configParams = new ConfigParams();
const app = express();
app.use(cos());
app.use(body_parse.json());
app.use(express.static('./public'));
////////////////////
// const awsAccessKeyId = process.env['AWSAccessKeyId'];
// const awsecretKey = process.env['AWSAccessKeyId'];
// const userpoolId=process.env['userpoolId'];
// const clientId = process.env['clientId']
//Asdf1234@
const awsAccessKeyId = 'AKIAJYAKMPEYVDOTJ7TA';
const awsecretKey = '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';
const clientId = '6ordo7clie48sj0fm4tc2qn26k'
const userpoolId = 'ap-northeast-2_MyPyTU0ec';


AWS.config.update({
  accessKeyId: awsAccessKeyId, secretAccessKey: awsecretKey, region: 'ap-northeast-2'
})

const s3 = new AWS.S3;
const cognito = new AWS.CognitoIdentityServiceProvider();
const poolData = {
  UserPoolId: userpoolId, // your user pool id here
  ClientId: clientId // your client id here
};
const userPool = new AWSCognito.CognitoUserPool(poolData);
//추후 lambda로 변경 예정 
// exports.handler = (event: any, context) => { 
//   console.log(event)
// }
app.use(express.json({ limit : "50mb" })); //리퀘스트 용량

app.post('./')
app.post('/createImg', (req, res) => {
  const request = req['body'];
  if (!!request) {
    const binaryData = Buffer.from(request['body'], 'base64');
    fs.writeFile('./public/images/' + request['fileName'], binaryData, { encoding: 'binary' }, (value) => {
      const message = value == null ? 'ok' : value;
      res.send({ message });
    });
  }
});
app.post('/confirm_SignUp', (req, res) => {
  const request = req['body'];
  const data = request['body'];
  const confirmationCode = data['confirmationCode']
  const username = data['id'];
  const params2 = configParams.getConfirmSignUpParams(username, confirmationCode, clientId);

  cognito.confirmSignUp(params2, (err, data) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send({ message: 'ok' });
    }
  });
});
app.post('/logout', (req, res) => {
  userPool.getCurrentUser()?.signOut();
});
app.post('/sign_up', (req, res) => {
  const request = req['body'];
  if (!!request) {
    const data = request['body'];
    const params = configParams.getSignUpParams(data, clientId);
    cognito.signUp(params, (err, data) => {
      if (err) {
        console.log(err);
      }
      else {
        res.send({ message: 'ok' });
      }
    });
  }
});
app.post('/logined', (req, res) => {
  if (!!userPool.getCurrentUser()) {
    userPool.getCurrentUser()?.getSession((err: any, session: any) => {
      if (!!session) {

        const name=(session?.idToken?.payload?.name)?(session?.idToken?.payload?.name):'';
        console.log(name);
        res.send({name});
      }

    })
  } else {
    res.send({name:''});
  }
})
app.post('/login', (req, res) => {
  const request = req['body'];
  if (!!request) {
    const data = request['body'];
    const authenticationData = {
      Username: data['id'], // your username here
      Password: data['password'], // your password here
    }
    const authenticationDetails = new AWSCognito.AuthenticationDetails(authenticationData);

    const userData = {
      Username: data['id'], // your username here
      Pool: userPool
    };
    const cognitoUser = new AWSCognito.CognitoUser(userData);


    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        //console.log(result);
        res.send({ message: 'ok' });
      },

      onFailure: (err) => {
        console.log(err);
      },
    });
  }
});
app.post('/id_check', (req, res) => {
  const params = configParams.getUserParam(userpoolId);
  const request = req['body'];
  let cheked = false;
  if (!!request) {
    const data = request['body'];
    cognito.listUsers(params, (errors, value) => {
      const user = value.Users?.find((value) => {
        return value.Username === data;
      });
      if (!user) {
        cheked = true;
      }
      res.send({ cheked })
    });
  }
});
app.post('/sign_up_Check', (req, res) => {
  const request = req['body'];
  if (!!request) {
    const data = request['body'];
    const params = configParams.getUserParam(userpoolId);

    cognito.listUsers(params, (errors, value) => {
      let cheked = false;
      console.log(errors)
      if (!errors) {
        if (!!value) {
          const user = value.Users?.find((userData) => {
            const phone_number = userData.Attributes?.find((attribute) => {
              return (attribute.Value === data['phone_number']);
            })
            const birthDay = userData.Attributes?.find((attribute) => {
              return (attribute.Value === data['birthDay']);
            })
            const name = userData.Attributes?.find((attribute) => {
              return (attribute.Value === data['name']);
            })
            return !!phone_number && !!birthDay;

          });
          console.log(user);
          // 없으면 true반환
          if (!user) {
            cheked = true;
          }

        } else {
          cheked = true;
        }
        res.send({ cheked })
      }

    });

  }
});
app.listen(3000);