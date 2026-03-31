const user = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createdata = async(req,res)=>{
    try{
    let passdata = req.body
    passdata.password =  await bcrypt.hash(passdata.password,10)
    const data = await user.create(passdata)
    res.status(200).json({
        status : 'success',
        Message : 'date create successfully',
        data : data
    })
    }catch(error){
         res.status(500).json({
        status : 'failed',
        message : error.message
      
    })
    }
}
exports.deletedata = async (req, res) => {
    try {

        const deleteid = req.params.deleteid
        const deletedata = await user.findByIdAndDelete(deleteid)
        if (!deletedata) {
            return res.status(404).json({
                status: "fail",
                message: "user not found"
            });
        }
        res.status(200).json({
            status: 'success',
            Message: 'date delete successfully',
            data: deletedata
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message

        })
    }
}
exports.login = async(req,res)=>{
    try{
      let passdata = req.body
      const emailverify = await user.findOne({
        $or : [
            {name : passdata.name},
            {phone : passdata.phone},
            {email : passdata.email},

        ]
      })
      console.log(emailverify);
      if(!emailverify) throw new Error('invalid name or phone number or email')
    
    const passverfy = await bcrypt.compare(
        passdata.password,
        emailverify.password
    )
    console.log(passverfy);
     if(!passverfy) throw new Error('invalid password')

    const token = jwt.sign({id:emailverify._id},'ten',{expiresIn : '1h'})
      res.status(200).json({
        status : 'success',
        Message : 'user login successfully',
        data : emailverify,token
    })

      
    }catch(error){
        res.status(401).json({
        status : 'failed',
        message : error.message   
    })
    }
}
