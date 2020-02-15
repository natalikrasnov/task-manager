const express = require('express')
require('./db/mongoose')
//TODO:
//to start run m ongodb run this command in another terminal 
// C:\Users\nata5\Desktop\learning\node\task-maneger> c:\Users\nata5\mongodb\bin\mongod.exe --dbpath c:\Users\nata5\mongodb-data

const User = require('./models/User')
const Task = require('./models/Task')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const auth = require('./middleware/auth')

const app = express()
const port = process.env.port

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


//--------------------------------------------------------------------
app.listen(port, ()=>{
    console.log('server is up on port '+port)
})

//---------------------------------------------

/*
//----------------------------------------------------
//relationship between task and user->

const Task = require('./models/Task')
const User = require('./models/User')

const main = async() => {
    const task = await Task.findById('fyjghiujopsd5454')
    await task.populate('owner').execPopulate()
    console.log(task.owner)

    const user = await User.findById('fhguklik546847fg5565')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()

*/