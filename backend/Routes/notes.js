const express = require('express')
const router= express.Router();
const Note = require('../models/Note')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

// Route 1: get all the notes using :get "/api/auth/getuser" login required
router.get('/fetchallnotes',fetchuser,
async(req,res)=>{
    try{
  const notes = await Note.find({user:req.user.id})

    res.json(notes)
    }catch (error){
        console.error(error.message)
        res.status(500).send("Internal sever error ")
      }
})


// Route 2: add a new note using : post "/api/notes/addnote". login required
router.post('/addnote', fetchuser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 }),],async(req,res)=>{
    try {
    const {title,description, tag}=req.body;
// if there are errors return bad request and the errors
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}

        const note = new Note({
            title,description,tag, user:req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote)
    } catch (error){
        console.error(error.message)
        res.status(500).send("some error occured")
      }
})

// ROUTE 3 :update an existing note using:put" /api/notes/updatenote. login required
router.put('/updatenote/:id', fetchuser,async(req,res)=>{
  const {title,description, tag}= req.body;
  try {
  // create a newnote object 
  const newNote ={}; 
  if(title){newNote.title=title}
  if(description){newNote.description=description}
  if(tag){newNote.tag=tag}

// find the note to be updated and update it 
let note = await Note.findById(req.params.id);
if(!note){return res.status(404).send("not found")}

if(note.user.toString() !== req.user.id){
  return res.status(401).send("Not Allowed")
}

 note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote}, {new:true})
res.json({note})
} catch (error){
  console.error(error.message)
  res.status(500).send("Internal sever error ")
}

  })

  // Route 4: delete an existing note using :delete "/api/note/deletenote". login required
  // ROUTE 3 :update an existing note using:put" /api/notes/updatenote. login required
router.delete('/deletenote/:id', fetchuser,async(req,res)=>{
  const {title,description, tag}= req.body;
  try {

// find the note to be updated and update it 
let note = await Note.findById(req.params.id);
if(!note){return res.status(404).send("not found")}

if(note.user.toString() !== req.user.id){
  return res.status(401).send("Not Allowed")
}

 note = await Note.findByIdAndDelete(req.params.id)
res.json({"success":"Note has been deleted",note:note})
} catch (error){
  console.error(error.message)
  res.status(500).send("Internal sever error ")
}

  })

  //  router 4: search the 
router.post('/search/:key',async(req, res)=>{
  // if there are errors return bad request
try{
// var regex = await new RegExp(req.params.key,'i');
// User.find({key:regex}).then((result)=>{
//   res.status(200).json(result)

// })
// console.log(req.params.key)
let data = await Note.find(
  {
    "$or":[
      {"title":{$regex:req.params.key}},
      {"description":{$regex:req.params.key}},
      {"tag":{$regex:req.params.key}}
    ]
  }
)
res.send(data)
}

catch (error){
  console.error(error.message)
  res.status(500).send("Internal sever error ")
}



})

module.exports = router