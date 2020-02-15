require('../src/db/mongoose')
const task = require('..\src\models\Task')


task.findByIdAndUpdate('fygoiu0ieiph556545448', {complited: false}).then((task)=>{
    console.log(task)
    return user.countDocuments({complited:false})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})



task.findByIdAndDelete('fygoiu0ieiph556545448', {complited:true}).then((task)=>{
    console.log(task)
    return user.countDocuments({complited:true})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})


const updateAgeAndCount = async (id,age)=>{
    const user = await task.findByIdAndUpdate(id, {age})
    const count = await task.countDocuments({age})
    return count
}

updateAgeAndCount('vghvjhijp44454gygjjkkk',2).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})