import express from 'express'
import Item from './ItemModel.js';
import mongoose from 'mongoose'
import connectDb from './connectDb.js';
import cors from 'cors'
const app = express()
const port = 5000
app.use(express.json());
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
  }
  
  app.use(cors(corsOptions)) 
const dbUrl = 'mongodb://personal:personal@ac-qntkawo-shard-00-00.jbfhiuh.mongodb.net:27017,ac-qntkawo-shard-00-01.jbfhiuh.mongodb.net:27017,ac-qntkawo-shard-00-02.jbfhiuh.mongodb.net:27017/?ssl=true&replicaSet=atlas-hdzylf-shard-0&authSource=admin&retryWrites=true&w=majority'
connectDb(dbUrl)
// create a new item
app.post('/createItem', async(req,res) => {
 
console.log("body: " ,req.body)
const  {name, desc} = req.body

const itemdata= new Item({
    name: name,
    desc: desc
})
const item = await itemdata.save()
if(item){

    res.status(200).json({"msg": "Item saved successfully","saved Item":item})
}else{
    res.status(500).json({"msg": "Error in creating item"})
}

 


})
// getItem
app.post('/getItem', async(req,res) => {
    try {
    const data =  await Item.find()
    console.log("data is ..",data)
    if(data){
        res.status(200).json({"msg":"data fetched successfully", "data": data})
    }else{
        res.status(400).json({"msg":"data  not fetched successfully"})
    }
} catch (error) {
    res.status(500).json({"msg":"Internal server error"})
}
console.log("body: " ,req.body)
})
// updateItem
app.put('/updateItem/:id', async(req,res) => {

console.log("date body data: " ,req.body)
const {name, desc} = req.body
console.log("body", req.body)
const id = req.params.id
console.log("id: ",id)
try {
 if(name){
    const newdata = {name:name, desc:desc}

 const updateRes = await Item.findByIdAndUpdate(id,  {$set: newdata }, { new: true } )
 if(updateRes){
     res.status(200).json({"msg":"data updated successfully", "data": updateRes})
 }
}else{
    res.status(400).json({"msg":"name is required"})
}
} catch (error) {
    res.status(500).json({"msg":"Internal server error"})
}
})
// deleteItem
app.delete('/deleteItem/:id', async(req,res) => {
    try {
        const id = req.params.id
        const deleteRes = await Item.findByIdAndDelete(id)
        if(deleteRes){
            res.status(200).json({"msg":"Task deleted successfully"})
            }else{
                res.status(400).json({"msg":"Task not deleted successfully"})
            }
            
            
        } catch (error) {
               res.status(500).json({"msg":"Internal server error"})
            
           } 
console.log(" item id body: " ,req.body)

})
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
