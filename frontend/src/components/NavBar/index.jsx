import {NavLink}from "react-router-dom"
import "./style.css"

const NavBar = () => {

  return (
    <>
    <div id="NavBar">
      <div className="NavItems">
        <NavLink to="/">Match</NavLink>
        <div className="line"> </div>
        <NavLink to="/profile">Profile</NavLink>
        <div className="line"> </div>
        <NavLink to="/login">Login</NavLink>
      </div>
    </div>
    </>
  )
}

export default NavBar
