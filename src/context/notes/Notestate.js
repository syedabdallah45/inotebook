import NoteContext from "./notecontext";
import React, { useState } from 'react'


const NoteState =(props)=>{
  const host ="http://localhost:5000";
    const notesInitial=[]

      const [notes, setNotes] = useState(notesInitial)
      
          //get all notes
     const getNotes=async()=>{
      let url=`${host}/api/notes/fetchallnotes`
      const response = await fetch(url, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
           "auth-token":localStorage.getItem('token')
        }
       
       
      });
    
      const json= await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
    setNotes(json)
    }
     //add a note
     const addNote=async(title,description, tag)=>{
      let url=`${host}/api/notes/addnote`
      const response = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
           "auth-token":localStorage.getItem('token')
        },
       
        body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
      });
      const note= await response.json(); // parses JSON response into native JavaScript objects
  setNotes(notes.concat(note))
     }
    //  Delete a note
    const deleteNote=async(id)=>{
      let url=`${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
             "auth-token":localStorage.getItem('token')
          },
         
          
        });
        const json= response.json(); // parses JSON response into native JavaScript objects
      console.log(json)
        // To delete a note
      console.log("deleting the note with id "+ id)
     const newNotes= notes.filter((note)=>{ return note._id!==id})
   

  
      setNotes(newNotes)
    }

     //  edit a note
     const editNote=async(id,title,description,tag)=>{
     
      let url=`${host}/api/notes/updatenote/${id}`
      const response = await fetch(url, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
           "auth-token":localStorage.getItem('token')
        },
       
        
        body: JSON.stringify({title, description, tag})
      });
      const json= response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
       
       let newNotes = JSON.parse(JSON.stringify(notes))
      for (let index = 0; index <  newNotes.length; index++) {
        const element =   newNotes[index];
      
        if (element._id===id) {
        console.log('the id',id,element._id)
         newNotes[index].title =title;
         newNotes[index].description= description;
         newNotes[index].tag= tag;
          break;
        }
 }
      setNotes(newNotes)
    }

    const searchNote=async(key)=>{
      let url=`http://localhost:5000/api/notes/search/${key}`
        const response = await fetch(url, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            //  "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({key})
         
          
        });
        const json= response.json(); // parses JSON response into native JavaScript objects
      console.log(json)
        // To delete a note
        console.log("searching the note with key "+ key)
        // console.log("searching the note with key "+ key)
    
        const filtered = notes.filter(note=> {
          return note.title.toLowerCase().includes(key.toLowerCase())
        
        })
    
        console.log(filtered)
        setNotes(filtered)
        
          
      
    const filter = notes.filter(note=> {
      return note.description.toLowerCase().includes(key.toLowerCase())
    
    })

    console.log(filter)
    setNotes(filter)
  
    
        
    
//    const filtered1 = notes.filter(note=> {
//   return note.description.toLowerCase().includes(key.toLowerCase())

// })
// console.log(filtered1)
// setNotes(filtered1)

      
      
    }   
    
   
   
   
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes,searchNote}}>
            {props.children}
        </NoteContext.Provider>
    )

}


export default NoteState;