import { useNavigate, Link } from "react-router-dom"
import logo from "../../assets/PLPLogo.png"
import {useAuth} from "../../Auth/index.jsx"
import { baseURL } from "../../consts/api.ts"
import axios from "axios"
import "./style.css"

const NavBar = () => {
  const nav = useNavigate()
  const {user, setUser} = useAuth()

  function logout(event) {
    event.preventDefault()
    const token = localStorage.getItem("token")
    if(token) {
      axios.delete(`${baseURL}/users/logout`, {
        headers: {Authorization: token}
      })
      localStorage.removeItem("token")
    }
    setUser(null)
    nav("/")
  }

  function home() {
    nav("/")
  }
    return (
      <header id="header" className="absolute w-full mx-auto text-SpringGreen bg-GunMetal z-10 py-4 border-y-[2px] mt-6 border-DarkSpring">
        <div className="container mx-auto">
          <div id="nav" className="flex justify-between">
            <a className="logo pb-4 flex items-center p-[33px] items-center relative">
              <img src={logo} id="icon" className="sm:scale-[330%] absolute lg:top-2 lg:left-32 bg-none" onClick={home}></img>
            </a>
            <div className="flex items-center space-x-8">
              <div className="hidden xl:flex items-center space-x-4">
              </div>
              <div className="border-l-2 border-DarkSpring h-8 mx-4"></div>
              <nav className="flex lg:flex-row sm:flex-col space-x-6 text-[20px]" id="nav_items">
                <li className="list-none">
                  <Link to="/" className="hover:text-Aquamarine hover:underline">Home</Link>
                </li>
                <li className="list-none">
                  <Link to="/live" className="hover:text-Aquamarine hover:underline">Live Matches</Link>
                </li>
                <li className="list-none">
                  <Link to="/teams" className="hover:text-Aquamarine hover:underline">Teams</Link>
                </li>
                <li className="list-none">
                  <Link to="/leaderboards" className="hover:text-Aquamarine hover:underline">Leaderboards</Link>
                </li>
                {user ? (
                  <>
                  <li className="list-none">
                    <Link to="/profile" className="hover:text-Aquamarine hover:underline">Profile</Link>
                  </li>
                  <li className="list-none">
                    <button className="hover:text-Aquamarine hover:underline" onClick={logout}>Logout</button>
                  </li>
                  </>
                ) : (
                  <li className="list-none">
                    <Link to="/login" className="hover:text-Aquamarine hover:underline">Login</Link>
                  </li>
                )}
              </nav>
            </div> 
          </div>
        </div>
      </header>
    )      
}

export default NavBar
