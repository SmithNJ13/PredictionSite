import { useNavigate } from "react-router-dom"
import logo from "../../assets/PLPLogo.png"
import "./style.css"

const NavBar = () => {
  const nav = useNavigate()

  function home() {
    nav("/")
  }
    return (
        <header id="header" className="sticky top-0 mx-auto text-SpringGreen bg-GunMetal z-10 py-[10px] border-y-[2px] my-[1.5rem] border-DarkSpring">
          <div className="container mx-auto">
            <div id="nav" className="flex justify-between">
              <a className="logo pb-4 flex items-center p-[33px] items-center relative">
                <img src={logo} id="icon" className="scale-[330%] absolute top-[5px] left-[70px] bg-none" onClick={home}></img>
              </a>
              <div className="flex items-center space-x-8">
                <div className="hidden xl:flex items-center space-x-4">
                </div>
                <div className="border-l-2 border-DarkSpring h-8 mx-4"></div>
                <nav className="flex space-x-6 text-[20px]" id="nav_items">
                  <li className="list-none">
                    <a href="/" className="hover:text-Aquamarine hover:underline">Home</a>
                  </li>
                  <li className="list-none">
                    <a href="/live" className="hover:text-Aquamarine hover:underline">Live Matches</a>
                  </li>
                  <li className="list-none">
                    <a href="/teams" className="hover:text-Aquamarine hover:underline">Teams</a>
                  </li>
                  <li className="list-none">
                    <a href="/profile" className="hover:text-Aquamarine hover:underline">Profile</a>
                  </li>
                  <li className="list-none">
                    <a href="/login" className="hover:text-Aquamarine hover:underline">Login</a>
                  </li>
                </nav>
              </div>
            </div>
          </div>
        </header>
      )      
}

export default NavBar
