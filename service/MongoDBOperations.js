const MongoClient = require('mongodb').MongoClient;
const URL = "mongodb://localhost:27017/";
const DB="tech2k19";
const PARTICIPANTS="participants";


module.exports={

getParticipantByEmail(login){

return new Promise((resolve,reject)=>{



    MongoClient.connect(URL, function(err, db) {
        if (err) throw err;
        let dBOperation = db.db(DB);   
    let emailFindQuery={email:login.email}
        dBOperation.collection(PARTICIPANTS).find(emailFindQuery).toArray(function(err, results){
            if(err){ 
    reject(err);            
}
            else{
                if(results.length==1){    
        resolve(results[0].password);
    }
            }
            });});








});

}


}