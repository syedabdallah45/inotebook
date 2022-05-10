const mongoose= require('mongoose')
const { Schema } = mongoose;

const OtpSchema = new Schema({
    email:{
        type:String,
        
    
    },
    code:{
        type:String,
       
    },
    expireIn:{
        type:Number,
    
    },


    
   
  });
  const Otp = mongoose.model('otp', OtpSchema)
//   User.createIndexes()
  module.exports= Otp