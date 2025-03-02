import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom';


export default function Login() {

  const [cred, setcred] = useState({ email: "", password: "" })
  let navigate=useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: cred.email, password: cred.password })
    });
    const json = await response.json()
    console.log(json);
    if (!json.success) {
      alert("Enter valid credential");
    }
    else 
    {
      localStorage.setItem('userEmail', cred.email)
      localStorage.setItem("authtoken",json.authtoken);
      console.log(localStorage.getItem("authtoken"));
      navigate("/");
    }
  }
  const onchange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className='container'>
        <form onSubmit={handlesubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={cred.email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={cred.password} onChange={onchange} id="exampleInputPassword1" />
          </div>
          <button type="submit" className="m-3 btn btn-primary">Submit</button>
          <Link to='/createuser' className='m-3 btn btn-danger'>I'm a  New User</Link>
        </form>
      </div>
    </>
  )
}
