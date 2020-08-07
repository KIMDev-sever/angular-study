import express = require('express');
import fs = require('fs');
import cos = require('cors');
import body_parse=require('body-parser');
const app = express();
app.use(cos());
app.use(body_parse.json());
app.use(express.static('./public'));
app.post('/createImg', (req, res) => {
  const request=req['body'];
  if(!!request){
     const binaryData = Buffer.from(request['body'], 'base64');
      fs.writeFile('./public/images/'+request['fileName'], binaryData, {encoding: 'binary'},(value)=>{
          const message= value==null?'ok':value;
          res.send({message});
      });
  }
});

app.listen(3000);