import React,{useContext, useEffect, useRef,useState} from 'react'
import noteContext from '../context/notes/notecontext'
import Noteitem from './Noteitem';
import AddNote from './AddNote'
import { useHistory } from 'react-router';



export default function Notes() {
    const context = useContext(noteContext)
    let history = useHistory();
    const {notes,getNotes,editNote} = context;
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" })
    const ref = useRef(null)
    const refClose = useRef(null)
  
    const handleClick = () => {
      console.log("updating the note.." , note)
      editNote(note.id, note.etitle, note.edescription, note.etag)
      refClose.current.click();
     
    }
    
    const updateNote=(currentNote)=>{
      ref.current.click();
      setNote({id:currentNote._id,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
    }
  
    const onChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value })
    }


    useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      history.push("/login")
    }
      
        
     
         // eslint-disable-next-line
      }, [])

      

     
    return (
    <div>
  
   <AddNote/>
   <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form className="my-3">
          <div className="mb-3 ">
            <label htmlFor="etitle" className="form-label">Title</label>
            <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} minLength={5} required onChange={onChange} aria-describedby="emailHelp" />

          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" onChange={onChange} id="edescription" name="edescription" minLength={5} required value={note.edescription}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" minLength={5} required onChange={onChange} id="etag" name="etag" value={note.etag}/>
          </div>
         
         
        </form>
      </div>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5}  onClick={handleClick} className="btn btn-primary">updateNote</button>
      </div>
    </div>
  </div>
</div>

   

   <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2 ">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note)=>{
            return <Noteitem key={note._id}  updateNote={updateNote}  note={note}/>
        })}
       
        </div>
        </div>
    )
}
