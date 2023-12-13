import {NavLink, useLocation,} from "react-router-dom"
import {useState, useEffect} from "react"
import "./style.css"

const NavBar = () => {
  const loc = useLocation()
  const [link, setLink] = useState("Profile")
  const [route, setRoute] = useState("/profile")
  const styling = {
    textDecoration: "none",
    color: "#ff5c5c"
  }
  function setText() {
    if(loc.pathname === "/profile") {
      setLink("Match")
      setRoute("/")
    } else {
      setLink("Profile")
      setRoute("/profile")
    }
  }

  useEffect(() => {
    setText()
  })

  return (
    <>
    <div id="NavBar">
      <div className="NavLinks">
        <NavLink className="profile" style={styling} to={route}>{link}</NavLink>
        <div>|</div>
        <NavLink className="register" style={styling} to="/login">Login</NavLink>
      </div>
    </div>
    </>
  )
}

export default NavBar
