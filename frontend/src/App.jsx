import { Routes, Route, Navigate} from "react-router-dom"
import { HomePage, ProfilePage, LoginPage, RegisterPage, NotFound, LivePage, TeamPage, LeaderboardPage} from "./pages/export"
import { NavBar } from "./components/export"
import {useAuth} from "./Auth/index"
import "./style.css"
import { useEffect, useState } from "react"
import { baseURL } from "./consts/api"
import axios from "axios"



function App() {
  const {user, setUser} = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token) {
      axios.get(`${baseURL}/users/auth`, {
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

  if(loading) return null


  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" replace />}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/live" element={<LivePage />} />
      <Route path="/teams" element={<TeamPage />} />
      <Route path="/leaderboards" element={<LeaderboardPage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
