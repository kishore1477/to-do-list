import axios from "axios";

 const getItem = () => async (dispatch) =>{
try {
    const res = await axios.post('https://filthy-pike-clothes.cyclic.app/getItem')

    dispatch({
      type: "get",
      payload: res.data,
    });
} catch (error) {
    console.log("error", error)
}
}

 const addItem = (data) => async (dispatch) =>{
try {
    // const  {} =
    const url = 'https://filthy-pike-clothes.cyclic.app/createItem'

    const res = await axios.post(url, data)

    dispatch({
      type: "add",
      payload: res.data,
    });
} catch (error) {
    console.log("error", error)
}
}

const deleteItem = (item)=>{
    return(dispatch)=>{
        dispatch({
        type:"delete",
        payload:item
        })
            }

}
const updateItem = (item)=>{
    return(dispatch)=>{
        dispatch({
        type:"update",
        payload:item
        })
            }
}
export {
    getItem,
    addItem,
    deleteItem,
    updateItem
}