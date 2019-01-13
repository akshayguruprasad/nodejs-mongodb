/**const mongoose = require('mongoose');                    
var Schema = mongoose.Schema;
var ParticipantsSchema = new Schema({

    firstName: { type: String,  required: [true, 'first name must be provided'] },
  lastName: { type: String,  required: [true, 'last name must be provided'] },
    email:    { 
      
      type: String
      },
  
    password: { type: String , required: [true,  'Password cannot be left blank']},
  
    mobile: { type: String , required: [true,  'mobile number cannot be left blank']},
  
  
  });
  
  module.exports = mongoose.model('Participants', ParticipantsSchema);
   */


class Participants{
constructor(){}


}
   module.exports=Participants;