const db = require('./db')


const depositcheck = (amt,acno,pswd)=>{
    amt = parseInt(amt)
    return db.Customer.findOne({acno,"password":pswd})
    .then(user=>{
        if(user){
            user.balance=user.balance+amt
            accbalance=user.balance
            user.transaction.push({
                "amount":amt,
                "type":"deposit",
                "status":"success"
            })
            user.save()
            return{
                statuscode:200,
                status:true,
                message:`Your account is credited with ${amt} `,
                accbalance

            }
        }
        else{
            return{
                statuscode:400,
                status:false,
                message:"Deposit Failed, you entered something wrong"
            }
        }
        
    })

}

const withdrawcheck = (amt,acno,pswd)=>{
    amt = parseInt(amt)

    return db.Customer.findOne({acno,"password":pswd})
    .then(user=>{
        if(user){
            if(amt<user.balance){
                user.balance=user.balance-amt
                user.transaction.push({
                    "amount":amt,
                    "type":"withdwal",
                    "status":"success"
                })
                user.save()
                return{
                    statuscode:200,
                    status:true,
                    message:`Rupees ${amt} is withdrawed succesfully  `

                }
            }
            else{
                return{
                    statuscode:400,
                    status:false,
                    message:"Insufficient balance"
                }
            }
        }
        return{
            statuscode:400,
            status:false,
            message:"Withdraw failed you entered something wrong"
        }

    })

}

const transaction = (acno)=>{

    return db.Customer.findOne({acno})
    .then(user=>{
        if(user){
            return{
                statuscode:200,
                status:true,
                message:user.transaction
            }
        }
        else{
            return{
                statuscode:400,
                status:false,
                message:"No such account"
            }
        }
    })

}

const creditcard = (adhar,pan,pswd,acno)=>{
    return db.Customer.findOne({acno,"password":pswd})
    .then(user=>{
        if(user){
            if(user.balance>=50000){
                if(user.creditbalance==0){
                user.creditbalance=user.creditbalance+100000
                user.adharcard=adhar
                user.pancard=pan
                creditbalance=user.creditbalance
                user.save()
                
                return{
                    statuscode:200,
                    status:true,
                    message:`Your creditcard apply is accepted and your current credit balance is ${user.creditbalance}`,
                    creditbalance
                }
                }
                else{
                    return{
                        statuscode:400,
                        status:false,
                        message:"Sorry you cannot apply again"
                    }
                }
                
            }
            else{
                return{
                    statuscode:400,
                    status:false,
                    message:"Sorry you are not eligible for credit card money"
                }
            }

        }
        else{
            return{
                statuscode:400,
                status:false,
                message:"You entered password wrong"
            }
        }
    })

}

module.exports={depositcheck,withdrawcheck,transaction,creditcard}

