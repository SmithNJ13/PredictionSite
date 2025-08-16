import {NavLink, useNavigate}from "react-router-dom"
import React, { useState } from "react"
import axios from "axios"
import {useAuth} from "../../Auth/index.jsx"
import { baseURL } from "../../consts/api.ts"

const LoginForm = () => {
    const string = "Don't have an account?"
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { setUser } = useAuth()
    const [errorType, setErrorType] = useState("")
   
    const currentName = (event) => {
      setName(event.target.value) 
    }
    const currentPassword = (event) => {
      setPassword(event.target.value)
    }
  
  
    async function login(e) {
      e.preventDefault()
      const form = new FormData(e.target)
      const data = {
        name: form.get("name"),
        password: form.get("password")
      }
      setLoading(true)
      setErrorType("")
      
      try {
        const response = await axios.post(`${baseURL}/users/login`, data)
        localStorage.setItem("token", response.data.token.token)
        const token = localStorage.getItem("token")
        const options = {
          headers: {
            Authorization: token,
          }
        }
        const response2 = await axios.get(
          `${baseURL}/users/auth`, options
        )
        setUser(response2.data)
        navigate("/")
      } catch (error) {
        if(error.response) {
          setErrorType(`${error.response.data.message}`)
        } else {
          console.log(error)
        }
      } finally {
        setLoading(false)
      }
    }

  return (
    <>
      <h1 id="title" className="text-primaryText text-center text-4xl mt-8 font-heading">Login Page</h1>
      <div id="content" className="flex flex-col gap-[10px] h-full w-full mt-4 font-mainText text-primaryText">
        <div className="self-center bg-GunMetal p-[2rem] rounded-[10px] w-[30rem] border border-secondaryText">
          <form onSubmit={login} className="loginform" autoComplete="off">
            <section className="top flex flex-col gap-[10px]">
              <label className="text-AshGray">Email / Username:</label>
              <input className="emailbox p-[10px] rounded-[5px] border border-gray-300 font-mainInfo text-black" placeholder="example@email.com" name="name" role="input" type="text" value={name} onChange={currentName}></input>
            </section>
            <section className="bottom flex flex-col gap-[10px]">
              <label className="text-AshGray">Password:</label>
              <input className="passbox p-[10px] rounded-[5px] border border-gray-300 font-mainInfo text-black" name="password" role="input" type="password" value={password} onChange={currentPassword}></input>
            </section>
            <button type="submit" disabled={loading} className="m-[1rem] p-[2px] text-primaryAccent border-[2px] border-primaryAccent rounded w-[33%] self-center hover:bg-slate-900">
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
                </div>
              ) : ( "Submit" )}
            </button>
              <p className={`relative self-center ${errorType ? "text-error" : "text-transparent display-none"}`}>
                {errorType ? errorType : "_"}
              </p>
          </form>
        <p className="m-[1rem] text-AshGray">{string} Sign up <NavLink to="/register" className="text-linkDefault font-bold italic hover:underline hover:text-linkHover">here</NavLink></p>
        </div>
      </div>
    </>
  )
}

export default LoginForm
