import React, { useState } from "react"
import axios from "axios"
import {useAuth} from "../../Auth/index.jsx"
import { baseURL } from "../../consts/api.ts"
import {NavLink, useNavigate}from "react-router-dom"



const Reset = () => {
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorType, setErrorType] = useState("")
    const currentName = (event) => {
      setName(event.target.value) 
    }

    async function postReset(e) {
        e.preventDefault()
        setLoading(true)
        setErrorType("")
        const form = new FormData(e.target)
        const data = {
        name: form.get("name")
        }
        console.log(data)
        try {
            const response = await axios.post(`${baseURL}/users/login/reset`, data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
    <>
    <h1 id="title" className="text-primaryText text-center text-4xl mt-8 font-heading">Forgot Password?</h1>
    <p className="text-primaryText text-center text-lg m-2 font-subheading">Please enter your email or username below.</p>
    <div id="content" className="flex flex-col gap-[10px] h-full w-full mt-4 font-mainText text-primaryText px-4">
    <div className="self-center bg-mainForeground p-[2rem] rounded-[10px] w-full max-w-[30rem] border border-secondaryText">
        <form onSubmit={postReset} className="loginform" autoComplete="off">
        <section className="top flex flex-col gap-[10px]">
            <input className="emailbox p-[10px] rounded-[5px] border border-gray-300 font-mainInfo text-black" placeholder="example@email.com" name="name" role="input" type="text" value={name} onChange={currentName}></input>
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
    </div>
    </div>
    </>
    )
}

export default Reset
