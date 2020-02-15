const validator = require('validator')
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description:{
    type: String, 
    required:true,
    trim: true
    },
    completed: {
        type:Boolean,
        fefault:false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }
    },{
    timestamps:true
})
    
const Task = mongoose.model('Task',taskSchema)

/*
function createNewRendonTask(){
    const task = new Task({
        description: 'Learn the mongoose library',
        completed: false
    })
}
function saveTask(task){ 
    task.save().then(()=>{
        console.log(task)
    }).catch((error)=>{
        console.log(error)
    })
}
*/

module.exports = Task