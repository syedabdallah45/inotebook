import React, { useState } from 'react'
import { useHistory,Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import classNames from 'classnames'
// import moduleName from 'module'


export default function Login(props) {

  const [credentials, setCredentials] = useState({ email: "", password: "", })
  const { register,formState: { errors } } = useForm({
    mode:"onBlur",
  });
  let history = useHistory();



 const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    if (json.success) {
      //  save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert("login successfully", "success")
      history.push("/")

    }
    else {
      props.showAlert("Invalid credentials", "danger")
    }
  }

// const changePassword=async(e)=>{
//   e.preventDefault();

//   const response = await fetch("http://localhost:5000/api/auth/reset-password", {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',

//     },
//     body: JSON.stringify({ email: credentials.email })


//   });
//   const json = await response.json(); // parses JSON response into native JavaScript objects
//   console.log(json);
//   if (json.success) {
//     //  save the auth token and redirect
//     localStorage.setItem('token', json.authtoken);
//     props.showAlert("check your Email", "success")
//     history.push("/login")

//   }
//   else {
//     props.showAlert("Invalid credentials", "danger")
//   }
// }







  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })


  }
  return (
    <div>
      <div className="container " style={{marginTop:"25px"}}>
        <h1>Login to iNotebook</h1>
        <form onSubmit={handleSubmit}>
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
           <Link to="/otpform"> <span className="forget" style={{color:"blue"}}>Forget password?</span></Link>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}
