const express =  require('express')
const ds = require('./dataservice')
const cors = require('cors')
const ts = require('./transactions')
const jwt = require('jsonwebtoken')


const app = express()
app.use(express.json())

app.use(cors({
    origin:'http://localhost:4200'
}))


app.post('/register',(req,res)=>{
    return ds.register(req.body.acno,req.body.pswd,req.body.uname)
     .then(user=>{   
         if(user){
             res.status(user.statuscode).json(user)
         }
 
     })
 })

app.post('/login',(req,res)=>{
    return ds.login(req.body.acno,req.body.pswd)
    .then(user=>{
        if(user){
            res.status(user.statuscode).json(user)
        }  
    })
})


const jwttokenmiddleware = (req,res,next)=>{
    try{
        const token = req.headers["x-access-token"]
        const data = jwt.verify(token, 'sajadsecretkey@123')
        if(req.body.acno==data.currentaccountnumber){
            next()
        }
    }
    catch{
        return{
            statuscode:400,
            status:false,
            message:"please login"
        }
    }
}

app.post('/depositcheck',jwttokenmiddleware,(req,res)=>{
    return ts.depositcheck(req.body.amt,req.body.acno,req.body.pswd)
    .then(user=>{
        if(user){
            res.status(user.statuscode).json(user)
        }
    })
})

app.post('/withdrawcheck',jwttokenmiddleware,(req,res)=>{
    return ts.withdrawcheck(req.body.amt,req.body.acno,req.body.pswd)
    .then(user=>{
        if(user){
            res.status(user.statuscode).json(user)
        }
    })
})

app.post('/transaction',(req,res)=>{
    return ts.transaction(req.body.acno)
    .then(user=>{
        if(user){
            res.status(user.statuscode).json(user)
        }
    })
})

app.post('/creditcard',(req,res)=>{
    return ts.creditcard(req.body.adhar,req.body.pan,req.body.pswd,req.body.acno)
    .then(user=>{
        if(user){
            res.status(user.statuscode).json(user)
        }
    })
})

app.delete('/deleteaccount/:acno',(req,res)=>{
    return ds.deleteaccount(req.params.acno)
    .then(result=>{
        if(result){
            res.status(result.statuscode).json(result)  
        }
    })

}
)










app.listen(3000,()=>{
    console.log("server listening to port number 3000");
})