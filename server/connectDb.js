 // const mongoose = require('mongoose');
import mongoose from 'mongoose';
// mongoose.connect('mongodb://localhost:27017/test');

 const connectDb = async(DataBaseUrl)=>{
    try {
        // const DB_OPTIONS ={
        //     dbName : "todolist"
        // }
   mongoose.connect(DataBaseUrl, {dbName : "todolist"})
    console.log("connected Successfully")
    } catch (error) {
        console.log(error)
    }
}
export default  connectDb