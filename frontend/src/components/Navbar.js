import React from 'react'
import { Badge } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal'
import { useCart } from './ContextReducer';
import Cart from '../screens/Cart'
import { useState } from 'react'

export default function Navbar() {
  const [cartView, setCartView] = useState(false)
  const navigate = useNavigate()
  const handlelogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login")
  }

  const loadCart = () => {
    setCartView(true)
  }
  const items = useCart();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authtoken")) ?
              <>
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">MyOrders</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myprofile">MyProfile</Link>
                </li>
              </>
                : ""}
            </ul>
            {(!localStorage.getItem("authtoken")) ?
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
              </div>
              : <div>
                <div className='btn bg-white text-success mx-2' onClick={loadCart}>
                  My Cart {"  "}
                  <Badge pill bg="danger">{items.length}</Badge>
                </div>

                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                <div className='btn bg-white text-danger mx-2' onClick={handlelogout}>
                  LogOut
                </div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
