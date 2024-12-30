import {NavLink, useNavigate}from "react-router-dom"
import React, { useState } from "react"
import axios from "axios"
import {useAuth} from "../../Auth/index.jsx"
import "./style.css"

const LoginPage = () => {
  const string = "Don't have an account?"
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const currentName = (event) => {
    setName(event.target.value) 
  }
  const currentPassword = (event) => {
    setPassword(event.target.value)
  }


  async function login(e) {
    console.log("Submitted")
    e.preventDefault()

    const form = new FormData(event.target)
    const data = {
      name: form.get("name"),
      password: form.get("password")
    }
    try {
      const response = await axios.post(
        "link", data
      )
      if(response.status === 200) {
        localStorage.setItem("token", response.data.token)
        const token = localStorage.getItem("token")
        const options = {
          headers: {
            Authorization: token,
          }
        }
        const response2 = await axios.get(
          "link", options
        )
        setUser(response2.data)
        navigate("/")
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div id="content">
      <h1>Login Page</h1>
      <form onSubmit={login} className="loginform">
        <section className="top">
          <label>Email / Username:</label>
          <input className="emailbox" placeholder="example@email.com" name="name" role="input" type="text" value={name} onChange={currentName}></input>
        </section>
        <section className="bottom">
          <label>Password:</label>
          <input className="passbox" name="password" role="input" type="password" value={password} onChange={currentPassword}></input>
        </section>
        <button type="submit">Submit</button>
      </form>
      <p>{string} Sign up <NavLink to="/register">here</NavLink></p>
    </div>
  )
}

export default LoginPage
