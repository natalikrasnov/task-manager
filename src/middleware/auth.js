const jwt = require('jsonwebtoken')
const User = require('../models/User')
/*
//express middleware
app.use((req,res,next)=>{
    res.status(503).send('site is curently douwn, check back soon')
    //to anable othetr methods, call 'next()', otherwise, it will stuck and never called for more methods
   // next()
})
*/

const auth = async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, 'thisismynewcource')
        const user = await User.findOne({_id: decoded._id})
        if(!user){
            throw new Error()
        }
        req.user = user
        next()
    }catch(e){
        res.status(401).send({error: 'please autenticate.'})
    }
}

module.exports = auth
