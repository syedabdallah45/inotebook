import React,{useState} from 'react'
import {Link,useHistory} from "react-router-dom";

// import { ToastContainer, toast } from 'react-toastify';
export default function OtpForm(props) {
    // const emailRef = useRef()
    const [credentials, setCredentials] = useState({ email: "", })
    // const [otpForm, setOtpForm] = useState(true)
    let history = useHistory()
    // console.log(credentials)
 
    const handleSubmit=async(e)=>{
      e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/reset-password", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
      
          },
          body: JSON.stringify({ email: credentials.email })
      
      
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);
        if (json.success) {
          //  save the auth token and redirect
          localStorage.setItem('token', json.authtoken);
          props.showAlert("check your Email", "success")
          history.push("/login")
          alert("check your email")
        }
        else {
          props.showAlert("Invalid credentials", "danger")
        }
    }
       
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })


  }   

    
 
 
    return (
        <div>
      <form  >
 <div className="mb-3">
    
    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
    <input type="email" className="form-control"  value={credentials.email} id="emails" onChange={onChange}  aria-describedby="emailHelp" name="email" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
 
   
  <Link to="/login"> <button type="button" className="btn btn-primary" onClick={handleSubmit}>Reset Password</button></Link>
</form>
        </div>
    )
}
