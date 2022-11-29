const jwt = require('jsonwebtoken')
const db = require('./db')

const register = (acno,pswd,uname)=>{

    return db.Customer.findOne({acno})
    .then(user=>{
        if(user){
            return{
                statuscode:400,
                status:false,
                message:"This User is already registered"
            }
        }
        else{
            const newuser = new db.Customer({
                "acno":acno,
                "password":pswd,
               "username":uname,
                balance:0,
                transaction:[],
                adharcard:0,
                pancard:"",
                creditbalance:0
            })
            console.log("Newuser",newuser)
            newuser.save()
            return{
                statuscode:200,
                status:true,
                message:"Registered succesfully"
            }
        }
    })

}

const login = (acno,pswd)=>{
    return db.Customer.findOne({acno,"password":pswd})
    .then(user=>{
        if(user){
            username=user.username
            accbalance=user.balance
            creditbalance=user.creditbalance
        
            const token = jwt.sign({
                currentaccountnumber:acno
            },'sajadsecretkey@123')
            return{
                statuscode:200,
                status:true,
                message:"login successfull",
                token,
                acno,
                username,
                accbalance,
                creditbalance

                
            }
        }
        else{
            return{
                statuscode:400,
                status:false,
                message:"sorry wrong account number and password"
            }

        }
    })

}

const deleteaccount=(acno)=>{
    return db.Customer.deleteOne({acno})
    .then(user=>{
        if(!user){
            return{
                statuscode:400,
                status:false,
                message:"operation failed"
            }
        }
        else{
            return{
                statuscode:200,
                status:true,
                message:"your account is deleted successfully"
            }
        }
    })
}



module.exports={register,login,deleteaccount}
