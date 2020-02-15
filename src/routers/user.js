const express = require('express')
const User = require('../models/User.js')
const auth = require('../middleware/auth')
const {sendWelcomeEmail, sendCancelationEmail} = require('../emails/account')
const multer = require('multer')
const sharp = require('sharp')

const router = new express.Router()

router.get('/test', (req,res)=>{
    res.send('FromA New File!')
})

router.get('/users/me', auth, async(req,res)=>{
    res.send(req.user)
})

////--POST---------------------------------------------------------

//app.post('/users',(req,res)=>{
    router.post('/users'/*,auth*/, async (req, res) => {  
        //  console.log(req.body)
          const user = new User(req.body)
      
         /* user.save().then(()=>{
              res.status(201).send(user)
          }).catch((error)=>{
              res.status(400).send(error)
              res.send(error)
          })*/
          try{
              await user.save()
              sendWelcomeEmail(user.email, user.name)
              const token = await user.genarateAuthToken()
              res.status(201).send({user, token})
          }catch(e){
              res.status(400).send(e)
          }
      })

     /* router.post('/users/login', async (req, res)=>{
          try {
              const user = await User.findBycredentials(req.body.emai,rerq.body.password)
              const token = await user.genarateAuthToken()
              res.send({user, token})
          } catch (error) {
              res.status(400).send()
          }
      })
      
      router.post('/users/logout',auth , async (req, res)=>{
          try{
              req.user.tokens = req.user.tokens.filter((token)=>{
                  return token.token !== req.token
               })
               await req.user.save()
               res.send()
          }catch(e){
              res.status(500).send()
          }
      })
      */
      
      //--GET----------------------------------------------------------
      
      //app.get('/users',(req, res)=>{
      router.get('/users',async (req, res)=>{
        try{
          const users = await User.find({})
          res.send(users)
        }catch(e){
          res.status(500).send(e)
        }
      /*  User.find({}).then((users)=>{
              res.send(users)
          }).catch((e)=>{
              console.log('error')
          })*/
      })
      
      router.get('/users/:id',async (res,req)=>{
          const _id = req.parems.id
          try{
              const user = await User.findById(_id)
              if(!user){
                  return res.status(404).send()
              }
              res.status(200).send(user)
          }catch(e){
              res.status(500).send(e)
          }
      })
      
      //--PATCH-------------------------------------------------------------------
      
      //update only for exist params
      router.patch('/users/:id', async (req, res)=>{
         const updates = Object.keys(req.params)
          const allowedUpdates = ['email','age','name','password']
          const isValidOperration = updates.every((update)=>allowedUpdates.includes(update))
          if(!isValidOperration){
              return res.status(400).send({'error':'invalid updates params'})
          }
          try{
            /*  const user = await User.findByIdAndUpdate(res.params.id, res.body,{
                  new:true,
                  runValidators: true,
              })*/
              const user = await User.findById(req.params.id)
              updates.forEach((update)=>user[update] = req.params[update])
              await User.save()
              if(!user){
                 return res.status(404).send()
              }
              res.status(200).send(user)
          }catch(e){
              res.status(500).send(e)
          }
      })
      
      router.patch('/users/me',auth, async (req, res)=>{
        const updates = Object.keys(req.body)
         const allowedUpdates = ['email','age','name','password']
         const isValidOperration = updates.every((update) => allowedUpdates.includes(update))
         if(!isValidOperration){
             return res.status(400).send({'error':'invalid updates params'})
         }
         try{
             updates.forEach((update) => req.user[update] = req.body[update])
             await req.user.save()
             res.status(200).send(req.user)
         }catch(e){
             res.status(500).send(e)
         }
     })
     
      //--DELETE-----------------------------------------------------------------
      
      router.delete('/users/:id', async (req,res)=>{
          try{
              const user = await User.findByIdAndDelete(req.params.id)
              if(!user){
                 return res.status(404).send()
              }
              res.send(user)
          }catch(e){
              res.status(500).send(e)
          }
      })

 
      router.delete('/users/me',auth, async (req,res)=>{
        try{
           // const user = await User.findByIdAndDelete(req.user._id)
            //if(!user){
              // return res.status(404).send()
            //}\
            // res.send(user)

            await req.user.remove()
            sendCancelationEmail(req.user.email, req.user.name)
            res.send(req.user)
        }catch(e){
            res.status(500).send(e)
        }
    })


////////////////////////////////////////////////////////////////////////////////////
      //------------------------------------------------------

router.post('/users/login', async (req,res)=>{
    try{
        const user = await User.findBycredentials(req.params.email, req.params.password)
       const token = user.generateOuthToken()
      //  res.send({user: user.getPublicProfile(),token})
        res.send({user,token})
    }catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutall',auth,async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
    }catch(e){
        res.status(500).send()
    }
})

//-----------------------------------------------
// Uploading avatar->>

const upload = multer({
    dest: 'images',
    limitets:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb ){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('please provide an image'))
        }
        
        cb(undefined, true)
    }
})

router.post('/users/me/avatar',auth, upload.single('avatar'), async(req,res)=>{
   const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250})
   
   // req.user.avatar = req.file.buffer
   req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error, req,res, next)=>{
    res.status(400).send({error: error.message})
})

router.delete('users/me/avatar', auth, async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req,res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    }catch(e){
        res.status(400).send()
    }
})

module.exports = router