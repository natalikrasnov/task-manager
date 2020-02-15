const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./Task')


const userSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true,
        //remove spaces before and after
        trim: true
    },
    email:{
        type: String,
        required:true,
        unique: true,
        trim:true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is invalid')
            }
        }
    },
    password:{
        type: String,
        trim:true,
        required:true,
        minlenth:7,
        validate(value){
          ///  if (value.lenth<6 || value==='password'){
            if (value.toLowerCase().includes('password')) {
                throw new Error('your password is invalide, please check your password dont havae the word"password"')
            }
        }
    },
    age:{
        type: Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('age need to be valid')
            }
        }
    },
    tokens:{
        token:{
            type: String,
            required: true
        }
    },
    tasks:[{
        token:{
            type: String,
            required:true
        }
    }],
    avatar:{
        type: Buffer
    }
},{
    timestamps: true
})

userSchema.virtual('/tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

//userSchema.methods.getPublicProfile = function(){
userSchema.methods.toJSON = function(){
   const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('unable to find user with this email')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch){
        throw new Error('your password is incorrect, please try again')
    }
    return user
}


//Hash the password before saving it
userSchema.pre('save', async function(next) {
    //not use arrow function bc off 'this' statamens not avialable in arrow function
    const user = this

    console.log('just before saving')
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    next()
})

userSchema.pre('remove', async function (next){
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})

const User = mongoose.model('User',userSchema)
module.exports = User


/*
function createNewUser(){
    const me = new User({
        name: 'Natali',
        email: 'hhjjj@hjk.com',
        password: 'passsssssssss'
    })
}

function savePerson(person){
    person.save().then(()=>{
        console.log(me)
    }).catch((error)=>{
        console.log(error)
    })
}
*/

