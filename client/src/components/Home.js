import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
const Home = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Fetcheddata, setFetcheddata] = useState([])
  const [formData, setformData] = useState({name:"", desc:""})
  const [cond, setcond] = useState(false)
  const [edata, setedata] = useState({id:"",ename:"", edesc:""})
  const getData = async() =>{
    const fetcheddata= await axios.post('https://5000-kishore1477-todolist-tm4dcxaxdad.ws-eu78.gitpod.io/getItem')
    console.log("fetcheddata", fetcheddata)
    setFetcheddata(fetcheddata.data)


  }
  // getData().then(response => console.log(response)) 
  useEffect(() => {
   getData().then(response => console.log(response))
  }, [ ])
  
const handleDelete =async (id) => {
  const res = await Swal.fire({
    title: "Confirm",
    text: "Are you sure want to delete this task?",
    icon: "info",
    confirmButtonText: "Continue",
    showCancelButton: true,
  });
  console.log(" delete res", res)
  if (res.isConfirmed) {
const res = await axios.delete(`https://5000-kishore1477-todolist-tm4dcxaxdad.ws-eu78.gitpod.io/deleteItem/${id}`)
console.log("res", res)
if(res.status == 200){
  await getData()
  Swal.fire("Deleted!", res.data.msg, "success");
}
  }else{
    Swal.fire("Cancelled", "Your task is safe :)", "error");
  }
}

const handleEdit  = async(data) => {
const  { id, name, desc}  = data;
setedata({id:id,ename:name, edesc:desc});
  handleShow()
}
const handleUpdate = async()=>{

  const { id, ename, edesc}= edata
  console.log("Edata", edata)
  const res = await axios({
    method: 'put',
    url: `https://5000-kishore1477-todolist-tm4dcxaxdad.ws-eu78.gitpod.io/updateItem/${id}`,
    data:{
    
      name:ename,
      desc:edesc
    }
      })
      console.log("Update response", res)
      if(res.status === 200){
  handleClose()
       await getData()

      }else{
        alert(res.data.msg)
      }


}
const EonChange = (e)=>{
  const  {  name, value} = e.target
  setedata({...edata, [name]:value})
}
  
  const showAdd = ()=>{
   
    setcond(true)
  }
  const showCancel =()=>{
    setcond(false)
  }
  const Onchange =(e)=>{ 
    setformData({...formData, [e.target.name]:e.target.value})
  }

  const addData = async(e)=>{
    e.preventDefault()
    console.log("formdata", formData)
    const {name, desc} = formData
    const url = 'https://5000-kishore1477-todolist-tm4dcxaxdad.ws-eu78.gitpod.io/createItem'
    const res = await axios({
      method: 'post',
      url:  url,
      data: {
        name: name,
        desc: desc
      }
    })
  console.log("response: " ,res)
if(res.status === 200){
  await getData()
  setformData({name:"", desc:""})
  setcond(false)
  alert(res.data.msg)

}else{
  alert(res.data.msg)
}
  }
  return (
    <div className="container">
        

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='text-black' closeButton>
          <Modal.Title>Update Your To Do</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Name</Form.Label>
<Form.Control type="text" placeholder="name" name='ename'onChange={EonChange}  value ={edata.ename}   />
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicEmail">
<Form.Label>Description</Form.Label>
<Form.Control  as="textarea" rows={3}  placeholder="desc" name='edesc'onChange={EonChange}  value ={edata.edesc}   />
</Form.Group>
</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='text-black' onClick={handleClose}>
          Cancel
          </Button>
          <Button variant="primary" className='text-black' onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='mt-9 w-full md:w-1/2 mx-auto'>
        {/* show add button */}
        {!cond && <a onClick={showAdd} className='cursor-pointer hover:text-red-400 text-2xl md:text-3xl 
       font-bold d-flex flex items-center justify-center'>
<AiOutlinePlus className='mx-4 hover:bg-red-400 hover:rounded-full'/>
<button className='cursor-pointer hover:text-red-400 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-violet-500' >Add Task</button>
</a>}
        
 {/* add data */}
{cond  && <div className='w-full relative '>

<form  className="p-2 w-full" onSubmit={async(e)=> await addData(e)}  >

 
          <div className="   p-3 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out "  >

             
            <input type="text" id="name" value={formData.name} onChange={Onchange} name="name" placeholder='Task name' className='border-none bg-transparent outline-none' required /> <br/>
            <textarea  value={formData.desc} onChange={Onchange} name="desc" placeholder='description' className='w-full border-none bg-transparent outline-none' required/>
            
          </div>
        

<div className='absolute  mt-1  right-0 '>
 <button onClick={showCancel} className=' text-white bg-red-400 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm'>Cancel</button> <button  className='  text-white bg-red-400 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm '>Add Task</button></div> </form></div>}
      </div>

<h1 className=' text-2xl md:text-3xl font-bold my-10  bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-violet-500'>Your To  Do List</h1>
{/* show data */}
      {Fetcheddata.data ?<>{ Fetcheddata.data && Fetcheddata.data.map((item,id)=>{
  return <div key={id} className='mt-10 d-flex w-full bg-slate-100 '>
<div className='w-3/4   '>
<div className=' '>{item.name}</div>
<div className=' '>{item.desc}</div>
</div>
<div  className='w-1/4  d-flex  flex items-center justify-center  '> 
<BiEditAlt size={25} onClick = {async()=> await handleEdit({id:item._id, name:item.name, desc:item.desc})} className='w-1/2 text-blue-700 cursor-pointer'/>
<MdDeleteOutline onClick={async()=> await handleDelete(item._id)} size={25} className='w-1/2  text-red-700 cursor-pointer'/>
</div>

  </div>
})} </>:<h1 className='text-center  flex items-center justify-center h-96'>Loading..</h1>}

</div>
  )
}

export default Home