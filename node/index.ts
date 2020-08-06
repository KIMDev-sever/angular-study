import express = require('express');
import fs = require('fs');
import cos = require('cors');
import body_parse=require('body-parser');
const app = express();
app.use(cos());
app.use(body_parse.json());
app.post('/createImg', (req, res) => {
  const body=req['body'];
  if(!!body){
     const binaryData = new Buffer(body, 'base64').toString('binary');
      fs.writeFile('test.png',binaryData, {encoding: 'binary'},(value)=>{
        console.log(value)
      });
  }
});

app.listen(3000, () => {

});