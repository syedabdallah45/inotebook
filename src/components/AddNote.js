import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/notecontext'

export default function AddNote() {
  const context = useContext(noteContext)
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "default" })
  
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: ""})
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  
}


  return (

    <div>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form className="my-3">
          <div className="mb-3 ">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title"    name="title"  minLength={5} required   onChange={onChange} value={note.title} aria-describedby="emailHelp" />
            <div className="invalid-feedback">
        Please choose a username.
      </div>
          </div>
     
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" onChange={onChange} id="description" minLength={5} required value={note.description} name="description" />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" onChange={onChange} id="tag" minLength={5} required value={note.tag} name="tag" />
          </div>
         
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" onClick={handleClick} className="btn btn-primary">Add Note</button>
        </form>
        
      </div>
    </div>
  )
}
