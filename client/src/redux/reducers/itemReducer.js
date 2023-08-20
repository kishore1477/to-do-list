import axios from "axios";

const getData = async(url)=>{
const data = await axios.post(url)
return data
}
const addData = async(url, data1)=>{
const data = await axios.post(url, data1)
return data
}
const initialState = [];
  const  itemReducer = (state =initialState, action) =>{
    const {type, payload} = action
switch (type) {
    case "get":
    return payload;
    case "add":
        
        break;
    case "update":
        
        break;
    case "delete":
        
        break;

    default:
       return state
}
}
export default itemReducer