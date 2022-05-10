// import React ,{useState}from 'react'
// import { useHistory } from 'react-router-dom';
// import { useForm } from "react-hook-form";
// import classNames from 'classnames'
// export default function PasswordForm(props) {
// //  console.log(props)
//     const [credentials, setCredentials] = useState({otp:"",password:"",cpassword:"" })

//     const { register,formState: { errors } } = useForm({
//         mode:"onBlur",
//       });
      
// // console.log({props.email})
//   let history = useHistory();
//       const onChange = (e) => {
//         setCredentials({ ...credentials, [e.target.name]: e.target.value })
    
    
//       }
//       const handleSubmit = async (e) => {
//       e.preventDefault()
//       Object.assign(credentials, props)
//      console.log(credentials,props)
     
//     //  Object.assign(credentials, props)
//     const {otp, password,cpassword}=credentials;
//         const response = await fetch("http://localhost:5000/api/auth/change-password", {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
    
//           },
//           body: JSON.stringify({ otp:otp,password:password,cpassword:cpassword})
    
//         });
//         const json = await response.json(); // parses JSON response into native JavaScript objects
//         console.log(json);
//         if (json.success) {
//           //  save the uth token and redirect
//           // localStorage.setItem('token', json.authtoken);
//           console.log("login successfully", "success")
//           history.push("/login")
    
//         }
//         else {
//         console.log("Invalid OTP", "danger")
//         }
//       }
    
    
//     return (
//         <div>
//               <div>
//       <div className="container " style={{marginTop:"25px"}}>
//         <form >
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">Otp</label>
//             <input type="text" className={classNames("form-control",{"is-invalid":errors.otp})} {...register("otp", { required: "otp is required",})}  value={credentials.otp} onChange={onChange} id="otps"  name="otp"  />
//             {/* {errors.email && (<div className="invalid-feedback">{errors.email.message}</div>)} */}
//             {errors.otp && (<div className="invalid-feedback">{errors.otp.message}</div>)}
//             {/* {errors.email?.type === 'minLength' && (<div className="invalid-feedback">Email must be alteat 5 characters</div>)} */}
//           </div>
//           <div className="mb-3">
//             <label htmlFor="Password" className="form-label">Password</label>
//             <input type="password" className={classNames("form-control",{"is-invalid":errors.password})} value={credentials.password} {...register("password", { required: "password is required",minLength:{value:4,message:"please enter valid password"}})}onChange={onChange}  id="passwords" name="password" />
//             {errors.password && (<div className="invalid-feedback">{errors.password.message}</div>)}
//           </div>
  
//   <div className="mb-3">
//     <label htmlFor="exampleInputPassword1" className="form-label">Confirm password</label>
//     <input type="password" className={classNames("form-control",{"is-invalid":errors.cpassword})} value={credentials.cpassword} name="cpassword" {...register("cpassword", { required: "password is required",minLength:{value:4,message:"please enter valid password"}})}  onChange={onChange} id="cpassword"/>
//     {errors.cpassword && (<div className="invalid-feedback">{errors.cpassword.message}</div>)}
//   </div>
         

//           <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
//         </form>
//       </div>
//     </div>
//         </div>
//     )
// }
