import React from 'react'

const Navbar = () => {
  return (

    <header className="text-gray-600 body-font md:shadow-md">
    <div className="container mx-auto flex flex-wrap   flex-col md:flex-row items-center">
      <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          
      <img  className="w-14 h-14  text-white  rounded-full" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbm7Fb2xOu6gMLoeGgtPwgv9__r5gfz2gvlw&usqp=CAU'></img>
      
       
        
        <span className="ml-3 text-2xl font-bold  ">To Do List</span>
      </a>
     
      
    </div>
  </header>
  
  )
}

export default Navbar