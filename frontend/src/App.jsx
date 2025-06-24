import { Routes, Route } from "react-router-dom"
import { HomePage, ProfilePage, LoginPage, RegisterPage, NotFound, LivePage, TeamPage} from "./pages/export"
import { NavBar } from "./components/export"
import {useAuth} from "./Auth/index"
import "./style.css"
import { useEffect, useState } from "react"
import axios from "axios"



function App() {
  const {setUser} = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token) {
      axios.get("http://localhost:8080/users/auth", {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        setUser(response.data)
      })
      .catch(() => {
        localStorage.removeItem("token")
        setUser(null)
      })
      .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])


  return (
    <>
    {loading == false && (
      <NavBar />
    )}
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/live" element={<LivePage />} />
      <Route path="/teams" element={<TeamPage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
