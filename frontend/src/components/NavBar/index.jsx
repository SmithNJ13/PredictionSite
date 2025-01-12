import { useNavigate } from "react-router-dom"
import logo from "../../assets/preddicionFootball2.png"
import "./style.css"

const NavBar = () => {
  const nav = useNavigate()

  function home() {
    nav("/")
  }
    return (
        <header id="header" className="sticky top-0 mx-auto text-black bg-green-200 z-10 py-[10px]">
          <div className="container mx-auto">
            <div id="nav" className="flex justify-between">
              <a className="logo pb-4 flex items-center p-[10px] items-center relative">
                <img src={logo} id="icon" className="scale-[500%] absolute top-[20px] left-[70px] bg-green-100 rounded-[10px]" onClick={home}></img>
              </a>
              <div className="flex items-center space-x-8">
                <div className="hidden xl:flex items-center space-x-4">
                </div>
                <div className="border-l-2 border-black h-8 mx-4"></div>
                <nav className="flex space-x-6 text-[20px]" id="nav_items">
                  <li className="list-none">
                    <a href="/" className="hover:text-lime-600 hover:underline">Home</a>
                  </li>
                  <li className="list-none">
                    <a href="/live" className="hover:text-lime-600 hover:underline">Live Matches</a>
                  </li>
                  <li className="list-none">
                    <a href="/teams" className="hover:text-lime-600 hover:underline">Teams</a>
                  </li>
                  <li className="list-none">
                    <a href="/profile" className="hover:text-lime-600 hover:underline">Profile</a>
                  </li>
                  <li className="list-none">
                    <a href="/login" className="hover:text-lime-600 hover:underline">Login</a>
                  </li>
                </nav>
              </div>
            </div>
          </div>
        </header>
      )      
}

export default NavBar
