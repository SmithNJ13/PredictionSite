import { Routes, Route } from "react-router-dom"
import { HomePage, ProfilePage, LoginPage, RegisterPage, NotFound, LivePage, TeamPage} from "./pages/export"
import { NavBar } from "./components/export"
import "./style.css"



function App() {

  return (
    <>
    <NavBar />
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
