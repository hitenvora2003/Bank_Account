
const jwt = require('jsonwebtoken')

exports.authcheck = async(req,res,next)=>{
    try{
       const token = req.headers.authorization
       if(!token)throw new Error("attach token");
       console.log(token);
       const tokenvrify = jwt.verify(token,'ten')

       if(!tokenvrify)throw new Error("invalid token");


       next()
       
    }
    catch(error){
         res.status(500).json({
        status : 'failed',
        Message : error.message
      
    }) 
    }
}