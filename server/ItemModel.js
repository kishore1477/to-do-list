//  create schema mongoose
 import mongoose   from 'mongoose'
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
 desc: {
    type: String,
    required: true,
     
    trim: true,
  },

})
// export schema default

const Item =  mongoose.model('User', schema);
export default Item;
 