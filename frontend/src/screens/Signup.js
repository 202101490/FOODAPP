// // import React, { useState } from 'react'
// // import { Link ,useNavigate} from 'react-router-dom'

// // export default function Signup() 
// // {
// //     const [cred,setcred]=useState({name:"",email:"",password:"",geolocation:""})
// //     const navigate = useNavigate(); 
// //     const handlesubmit=async (e)=>
// //     {
// //         e.preventDefault();
// //         const response=await fetch("http://localhost:5000/api/createuser",{
// //             method:'POST',
// //             headers:{
// //                 'Content-Type':'application/json'
// //             },
// //             body:JSON.stringify({name:cred.name,email:cred.email,password:cred.password,location:cred.geolocation})
// //         });
// //         const json=await response.json()
// //         console.log(json);
// //         if(!json.success)
// //         {
// //             alert("Enter valid credential or User with this email already exists");
// //         }
// //         else
// //         {
// //             navigate('/verifyotp')
// //         }
// //     }   

// //     const onchange=(e)=>
// //     {
// //         setcred({...cred,[e.target.name]:e.target.value})
// //     }
// //     return (
// //         <>
// //             <div className='container'>
// //                 <form onSubmit={handlesubmit}>
// //                     <div className="mb-3">
// //                         <label htmlFor="name" className="form-label">Name</label>
// //                         <input type="text" className="form-control" name='name' value={cred.name} onChange={onchange}/>
// //                     </div>
// //                     <div className="mb-3">
// //                         <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
// //                         <input type="email" className="form-control" name='email' value={cred.email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" />
// //                         <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
// //                     </div>
// //                     <div className="mb-3">
// //                         <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
// //                         <input type="password" className="form-control" name='password' value={cred.password} onChange={onchange} id="exampleInputPassword1" />
// //                     </div>
// //                     <div className="mb-3">
// //                         <label htmlFor="exampleInputAddress" className="form-label">Address</label>
// //                         <input type="text" className="form-control" name='geolocation' value={cred.geolocation} onChange={onchange} id="exampleInputAddress" />
// //                     </div>
// //                     <button type="submit" className="m-3 btn btn-primary" onSubmit={handlesubmit}>Submit</button>
// //                     <Link to='/login' className='m-3 btn btn-danger'>Already a User</Link>
// //                 </form>
// //             </div>
// //         </>
// //     )
// // }

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [cred, setcred] = useState({ name: "", email: "", password: "", geolocation: "" });
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password, location: cred.geolocation })
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials Or User with this email already exists");
    } else {
      navigate('/verifyotp');
    }
  }

  const onchange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f0f0f0' }}>
        <div className="row w-100">
          <div className="col-md-6 col-lg-4 mx-auto">
            <div className="card shadow-lg p-4 rounded">
              <h2 className="text-center mb-4">Signup</h2>
              <form onSubmit={handlesubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name='name' 
                    value={cred.name} 
                    onChange={onchange} 
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address <span className="text-danger">*</span>
                  </label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name='email' 
                    value={cred.email} 
                    onChange={onchange} 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp" 
                    required
                  />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input 
                    type="password" 
                    className="form-control" 
                    name='password' 
                    value={cred.password} 
                    onChange={onchange} 
                    id="exampleInputPassword1" 
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputAddress" className="form-label">
                    Address <span className="text-danger">*</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name='geolocation' 
                    value={cred.geolocation} 
                    onChange={onchange} 
                    id="exampleInputAddress" 
                    required
                  />
                </div>

                <button type="submit" className="m-3 ms-0 btn btn-primary w-100">Submit</button>
                <Link to='/login' className="m-3 ms-0 btn btn-danger w-100 text-center d-block">
                  Already a User?
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
