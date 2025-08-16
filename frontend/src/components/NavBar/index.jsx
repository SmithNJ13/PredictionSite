import { useNavigate, Link } from "react-router-dom"
import logo from "../../assets/PLPLogo.png"
import {useAuth} from "../../Auth/index.jsx"
import { baseURL } from "../../consts/api.ts"
import axios from "axios"

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
      <header id="header" className="absolute w-full mx-auto font-mainInfo font-bold text-primaryText bg-mainForeground z-10 py-4 mt-6">
        <div className="container mx-auto">
          <div id="nav" className="flex justify-between">
            <a className="logo pb-4 flex items-center lg:p-[34px] p-[28px] items-center relative">
              <img src={logo} id="icon" className="lg:scale-[340%] scale-[220%] absolute lg:top-2 lg:left-32 bg-none hover:cursor-pointer" onClick={home}></img>
            </a>
            <div className="flex items-center space-x-8">
              <div className="hidden xl:flex items-center space-x-4">
              </div>
              <div className="border-l-2 border-primaryAccent h-16 mx-4"></div>
              <nav className="flex lg:flex-row flex-col space-x-6 text-[20px]" id="nav_items">
                <li className="list-none">
                  <Link to="/" className="hover:text-primaryAccent border-b-[1px] border-transparent hover:border-primaryAccent">Home</Link>
                </li>
                <li className="list-none">
                  <Link to="/live" className="hover:text-primaryAccent border-b-[1px] border-transparent hover:border-primaryAccent">Live Matches</Link>
                </li>
                <li className="list-none">
                  <Link to="/teams" className="hover:text-primaryAccent border-b-[1px] border-transparent hover:border-primaryAccent">Teams</Link>
                </li>
                <li className="list-none">
                  <Link to="/leaderboards" className="hover:text-primaryAccent border-b-[1px] border-transparent hover:border-primaryAccent">Leaderboards</Link>
                </li>
                {user ? (
                  <>
                  <li className="list-none">
                    <Link to="/profile" className="hover:text-primaryAccent border-b-[1px] border-transparent hover:border-primaryAccent">Profile</Link>
                  </li>
                  <li className="list-none">
                    <button className="hover:text-primaryAccent border-b-[1px] border-transparent hover:border-primaryAccent" onClick={logout}>Logout</button>
                  </li>
                  </>
                ) : (
                  <li className="list-none">
                    <Link to="/login" className="hover:text-primaryAccent border-b-[1px] border-transparent hover:border-primaryAccent">Login</Link>
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
