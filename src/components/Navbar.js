import React,{useContext,useState} from 'react'
import {Link, useLocation,useHistory} from "react-router-dom";

import noteContext from '../context/notes/notecontext'


export default function Navbar() {
  const context = useContext(noteContext)

  const {searchNote,getNotes} = context;
  const [searchTerm, setSearchTerm] = useState({key:""})
  // const [note, setNote] = useState({key:"", title: "", description: "", tag: "" })
  // const [keys, setKeys] = useState(initialState)
 
  let history= useHistory()
  const handleLogout=()=>{
    localStorage.removeItem('token')
    history.push('/login')
  }
  let location = useLocation();
  // useEffect(() => {
  //   console.log(location.pathname)
  //  }, [location]);
//  const handleBlur=()=>{
//    setSearchTerm(getNotes)
//  }


  

    const handleSubmit=async(e)=>{
   
// const {key}= searchTerm;
      e.preventDefault()

      if(searchTerm !== ""){
        searchNote(searchTerm.key)
      }else{
  
        // history.push('/')
        
      setSearchTerm(getNotes)
      }
   
    
      // searchNote(searchTerm.key)
   
      

   
    }

     
    
  //   const {key}= searchTerm;
  //     let url=`http://localhost:5000/api/notes/search/${key}`
  //       const response = await fetch(url, {
  //         method: 'POST', 
  //         headers: {
  //           'Content-Type': 'application/json',
  //           //  "auth-token":localStorage.getItem('token')
  //         },
  //         body: JSON.stringify({key})
         
          
  //       });
  //       const json= response.json(); // parses JSON response into native JavaScript objects
  //     console.log(json)
      

  //     console.log("searching the note with key "+ key)
  //     // console.log("searching the note with key "+ key)
  //    const newNotes=  notes.filter((value)=>{
  //      return value.title.includes(searchTerm);
       
  //      })
  // //      console.log("searching the note with key "+ key)

  // // console.log(newNotes)
  //   setKeys(newNotes)
  //   } 

  const onChange = (e) => {
  
    setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value })
  }

    return (
        
           <nav className="navbar navbar-expand-lg navbar-dark bg-dark  fixed-top">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/about"?"active":""}`}  to="/about">About</Link>
        </li>
        <form className="d-flex" onSubmit={handleSubmit}>
        <input className="form-control me-2" type="search" name="key"  placeholder="Search"  value={searchTerm.key} onChange={onChange}  aria-label="Search"/>
        <button  className="btn btn-outline-success" type="submit">Search</button>
      </form>
        
      
    </ul>
   {!localStorage.getItem('token')? <div className="d-flex">
    <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
    <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
        </div>: <button className="btn btn-primary" onClick={handleLogout}>Logout</button>}
    </div>
  </div>
</nav>
      
    )
}
