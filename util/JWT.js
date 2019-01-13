const jwt = require('jsonwebtoken');
const PASSWORD="thisissparta";

module.exports={

tokenGenerate(object){
console.log("token generataion function is called");

    return jwt.sign(object, PASSWORD, { algorithm: 'RS256'});
},
tokenDecode(token){
    return  decoded = jwt.verify(token, PASSWORD);
}

}