import React from 'react'
// import noteContext from '../context/notes/notecontext'

export default function About() {
  // const a = useContext(noteContext)

    return (
        <div className="container my-4">
          <div className="row featurette">
      <div className="col-md-7">
        <h2 className="featurette-heading">iNotebook is a library where one can store the notes securely <span className="text-muted">It’ll blow your mind.</span></h2>
        <p className="lead">iNotebook is a great platform where one can add number of books and further they can get loged in and use it</p>
      </div>
      <div className="col-md-5">
        <img src="https://cdn-icons-png.flaticon.com/512/123/123793.png"  className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" alt="......" />

      </div>
    </div> 
    <div className="row featurette  my-4">
      <div className="col-md-7 order-md-2">
        <h2 className="featurette-heading">Oh yeah, it’s that good. <span className="text-muted">See for yourself.</span></h2>
        <p className="lead">Another featurette? Of course. More books content can be added here, without any cost and there will be securely provided the notes</p>
      </div>
      <div className="col-md-5 order-md-1">
      <img src="https://image.freepik.com/free-vector/notebook-icon-set-cartoon-set-notebook-vector-icons-collection-isolated_96318-2602.jpg"  className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" alt="......" />

      </div>
    </div>
        </div>
    )
}
