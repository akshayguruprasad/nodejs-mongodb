const bcrypt = require('bcrypt');
const LoginParticipant=require("./../model/LoginParticipant");
const ParticipantOperations=require("./../service/MongoDBOperations");
const saltRounds=10;
const JWT=require('./../util/JWT');
module.exports={
parseRequest(data,participant){
participant.firstName=data.firstName;
participant.lastName=data.lastName;
participant.email=data.email;
participant.mobile=data.mobile;
return participant;
},
hashPassword(password){
let promise=hashingPromise(password);
return promise;

}
,
login(request){

return function(callback){
    let passwordHashedPromise=ParticipantOperations.getParticipantByEmail(request.body);
passwordHashedPromise
.then((passwordHashed)=>{
    let passwordPlain=request.body.password;
    console.log(passwordPlain);
    console.log(passwordHashed);
    let isLoginSuccess=bcrypt.compareSync(passwordPlain,passwordHashed);
    let loginObject=new LoginParticipant();
    loginObject.email=request.body.email;
    loginObject.password=passwordHashed;
    loginObject.isLoginSuccess=isLoginSuccess;
    callback(null,loginObject);
})
.catch((err)=>{
console.log("error cause in login failed to verify the acount");
console.log(err)
callback(err)
})

}
},
tokenGenerate(loginObject,callback){


    console.log(JSON.stringify(loginObject));
    let data=JWT.tokenGenerate(loginObject);
console.log(data);
    return function (callback) {        
        if(!loginObject.isLoginSuccess){
        console.log("THe function is exec the failed login so back");
            callback(loginObject.isLoginSuccess);
        }

        console.log(data);
        callback(null,data);
    }
}


}


function hashingPromise(password){
return new Promise(
(resolve,reject)=>{


    bcrypt.hash(password, saltRounds, function(err, hash) {
    if(err){
        reject(err);
    }
    else{
resolve(hash);
    }
    });

});
}
