// CRUD -> create - read - update - delete


/*
MongoCleant.connect(connectinUrl,{ useNewUrlParser: true },(error,client)=>{
    if (error){
        return console.log ('error with connection to mongodb')
    }

    console.log('succes to connect')
})
*/

/*
//const mongodb = require('mongodb')
//const MongoClient = mongodb.MongoClient
//const objectID = mongodb.ObjectID
const {MongoClient, ObjectID} = require('mongodb')

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())
console.log(id.toHexString().length)

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//start connection:
MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    console.log ('success!!')
    const db = client.db(databaseName)    
    
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
    //CREATE:
    
    db.collection('users').insertMany([
        {
           name: 'Andrew',
            age: 27
         },{
            name: 'natali',
            age: 22
          }
        ],(error,result)=>{
            if(error){
                return console.log(error)
             }
            console.log(result.ops)

         })
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//READ:

     //    db.collection('users').findOne({name: 'natali' /* ,age: 22 *//*},(error,user) =>{
    
     /*   db.collection('users').findOne({_id: new ObjectID("5e1778edac1d983908383480")},(error,user) =>{

             if(error) {
                 return console.log('unable to fetch')
             }
             console.log(user)
         })    *//*
         db.collection('users').findOne({_id: new ObjectID("5e1778edac1d983908383480")},(error,user) =>{

            if(error) {
                return console.log('unable to fetch')
            }
            console.log(user)
        }) 

///--------------------------------------------------------------------

         db.collection('users').find({age: 22}).count((error,count)=>{
            console.log(count)
         })
///--------------------------------------------------------------------

         db.collection('users').findOne({age: 22},(error,user)=>{
            console.log(user)
         })
///--------------------------------------------------------------------
         db.collection('users').find({completed: false}).toArray((error, users)=>{
             console.log(users)
         })

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //UPDATE:
         db.collection('users').updateOne({
             _id: new ObjectID("5e1781ff920c5f29381c5247")
         },{
             //changes property-
             $set:{
                 name: 'Mike'
             },
             //increes age with 1
             $inc:{
                age: 1
             }
         }).then((result)=>{
             console.log(result)
         }).catch((error)=>{
             console.log(error)
         })
//---------------------------------------------
         db.collection('users').updateMany({
            name: 'Mike'
        },{
            $set:{
                name: 'nike'
            }
        }).then((result)=>{
            console.log(result.modifiedCount)
        }).catch((error)=>{
            console.log(error)
        })
        ///------------------------------------
       
        
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //DELETE:

        db.collection('users').deleteMany({
            age: 27
        }).then((result)=>{
            console.log(result)
        }).catch((error)=>{
            console.log(error)
        })
        ///--------------------------------------------------------------------

        db.collection('users').deleteOne({
            _id: new ObjectID("5e1781ff920c5f29381c5247")
        }).then((result)=>{
            console.log(result)
        }).catch((error)=>{
            console.log(error)
        })
})
*/