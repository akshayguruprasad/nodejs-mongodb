const https = require('https');
const fs = require('fs');
var async = require('async');
const express=require('express');
const MongoClient = require('mongodb').MongoClient;
const Promise = require('es6-promise').Promise;
const bodyParser = require('body-parser');  
const uuidv4 = require('uuid/v4');
const EmailService=require('./../util/EmailService');
const Participant=require("./../model/Participant")
const Util=require("./../util/commons")
const URL = "mongodb://localhost:27017/";
const REGISTER_PARTICIPANTS="/register";
const DB="tech2k19";
const PARTICIPANTS="participants";
const saltRounds = 10;
const options = {
    key: fs.readFileSync('./../certificate/key.pem', 'utf8'),
    cert: fs.readFileSync('./../certificate/server.crt', 'utf8')
  };
const PORT=9000;
const app=express();                              
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.post(REGISTER_PARTICIPANTS,(req,resp)=>{
    MongoClient.connect(URL, function(err, db) {
        if (err) throw err;
        let dBOperation = db.db(DB);        
let participant=Util.parseRequest(req.body,new Participant());
let passwordHolder=participant.firstName+uuidv4().substr(-12, 12);
let promise=Util.hashPassword(passwordHolder);
let hashedPassword=null;
promise
.then((hashedPassword1)=>{
hashedPassword=hashedPassword1;
return hashedPassword1;
})
.then((data)=>{

    participant.password=hashedPassword;
    console.log(participant.password);
    console.log("password after hashing :",hashedPassword);
            let emailFindQuery = { email: req.body.email };
            console.log(emailFindQuery);
    let registerPromise=new Promise((resolve,reject)=>{
        data=dBOperation.collection(PARTICIPANTS).find(emailFindQuery).toArray(function(err, results){
    if(err){reject(err);}
    else{
    resolve(results);
    }
    });
    });
    registerPromise.
    then((data)=>{
    console.log(data);
        if(data.length!=0){
    throw new Error("email already registered");
    }
    dBOperation.collection(PARTICIPANTS).insertOne(participant, function(err, res) {
        if (err) throw err;
        EmailService.sendEmail(res.ops[0],passwordHolder,EmailService.emailBody);
        db.close();
    });
    })
    .catch((err)=>{
        console.log(err);
        resp.send({status:false})
    }); 
    resp.send({status:true})
    })

.catch((error)=>{
console.log(error);
throw new Error(error);
});

});

});

app.post("/login",(req,resp)=>{
   
    async.waterfall([
       
        Util.login(req),Util.tokenGenerate
                
            ], function (error, success) {

                console.log("its the end of the waterfall model")
                if (error) { console.log('Something is wrong!'); }
                resp.send(success);
            });
});





app.get("/help",(req,resp)=>{
    resp.send("Help");
});

const server=https.createServer(options,app);
server.listen(PORT,()=>{
console.log(`Server running on the port ${PORT}`);
});