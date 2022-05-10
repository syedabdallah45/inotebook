import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import classNames from 'classnames'



export default function Signup(props) {
  const { register,formState: { errors } } = useForm({
    mode:"onBlur"
  });

      
    const [credentials, setCredentials] = useState({name:"",email:"",password:"", cpassword:"", })
    
        
        

 let history = useHistory();
    const handleSubmit= async (e)=>{
        e.preventDefault();
        
        const {name,email, password, }= credentials
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            
          },
         body: JSON.stringify({name,email, password})
          
        });
        const json=  await response.json(); // parses JSON response into native JavaScript objects
      console.log(json);
      if (json.success){
      //  save the auth token and redirect
      localStorage.setItem('token',json.authtoken);
      history.push("/")
      props.showAlert("Account created successfully", "success")
      }
      else{
        props.showAlert("Invalid credentials", "danger")
      }

    }  

    
    
   
    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
 
    }

    return (
    
        <div className="container my-3">
           <h1 className="my-2">Signup to iNotebook</h1>
           <form onSubmit= {handleSubmit}>
           <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control" id="name"  name="name" onChange={onChange}
      aria-describedby="emailHelp"/>
  


  </div>
 
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className={classNames("form-control",{"is-invalid":errors.email})} {...register("email", { required: "email is required",pattern:{value:/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,message:"please enter valid email"}})}  value={credentials.email} onChange={onChange} id="email"  name="email" aria-describedby="emailHelp" />
            {/* {errors.email && (<div className="invalid-feedback">{errors.email.message}</div>)} */}
            {errors.email && (<div className="invalid-feedback">{errors.email.message}</div>)}
            {/* {errors.email?.type === 'minLength' && (<div className="invalid-feedback">Email must be alteat 5 characters</div>)} */}
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">Password</label>
            <input type="password" className={classNames("form-control",{"is-invalid":errors.password})} value={credentials.password} {...register("password", { required: "password is required",minLength:{value:4,message:"please enter valid password"}})}onChange={onChange}  id="passwords" name="password" />
            {errors.password && (<div className="invalid-feedback">{errors.password.message}</div>)}
          </div>
  
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Confirm password</label>
    <input type="password" className={classNames("form-control",{"is-invalid":errors.cpassword})}  name="cpassword" {...register("cpassword", { required: "password is required",minLength:{value:4,message:"please enter valid password"}})}  onChange={onChange} id="cpassword"/>
    {errors.cpassword && (<div className="invalid-feedback">{errors.cpassword.message}</div>)}
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
    )
}
