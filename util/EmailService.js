const nodemailer = require('nodemailer');
module.exports={
sendEmail(partcipantDetails,password,emailFormat){
    let body=emailFormat(partcipantDetails,password);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'akshayguruprasad@gmail.com',
          pass: ''
        }
      });
      
      var mailOptions = {
        from: 'akshayguruprasad@gmail.com',
        to: 'akshayguruprasad@gmail.com',
        subject: 'Registeration success',
        html:body 
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
,
emailBody(partcipantDetails,password){
    let body=`
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Registeration success</title>
    </head>
    <body>
        <p>Hello ${partcipantDetails.firstName} ${partcipantDetails.lastName},</p>  
    <div>
<p>You have successfully registered to capgemini hackathon 2019.</p>
<p style="color:green;">Email    : ${partcipantDetails.email}</p>
<p style="color:green;">Password : ${password}</p>
    </div>
    
    
    </body>
    </html>
    
    `;
    return body;
  }
}


