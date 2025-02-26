import React, { useState } from 'react';
import { baseURL } from "../../consts/api";
import { NavLink } from 'react-router-dom';
import "./style.css"

const RegisterForm = () => {
const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target)
    const options = {
      method: "POST",
      body: JSON.stringify({
        username: form.get("username"),
        email: form.get("email"),
        password: form.get("password")
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
    const response = await fetch(`${baseURL}/users/register`, options)
    const responseData = await response.json()
    if(response.status === 201) {
      console.log("User successfully created")
      setFormData({
        username: '',
        email: '',
        password: '',
      });
    } else {
      alert(responseData.message || "Failed to create user")
    }
    console.log('Form Data Submitted:', formData);
    document.getElementById("register").reset()
  };

  return (
    <>
      <h1 id="title" className="text-SpringGreen text-center text-4xl underline">Register Page</h1>
      <div id="content" className="flex flex-col gap-[10px] h-full w-full">
        <div className="self-center bg-GunMetal p-[1rem] rounded-[10px] w-[30rem]">
          <form onSubmit={handleSubmit} id="register" className="flex flex-col gap-[20px] px-[1rem]">
            <section className="top flex flex-col">
              <label className="text-AshGray self-start">Username:</label>
              <input className="emailbox p-[10px] rounded-[5px] border border-gray-300" 
                  placeholder="JaneDoe1"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required>
              </input>
            </section>
            <section className="middle flex flex-col">
              <label className="text-AshGray self-start">Email:</label>
              <input className="emailbox p-[10px] rounded-[5px] border border-gray-300" 
                  placeholder="JaneDoe@email.com" 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required>
              </input>
            </section>
            <section className="bottom flex flex-col">
              <label className="text-AshGray self-start">Password:</label>
              <input className="passbox p-[10px] rounded-[5px] border border-gray-300"
                  placeholder="1234" 
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required> 
              </input>
            </section>
            <button type="submit" className="m-[1rem] p-[2px] text-SpringGreen border-[2px] border-gray-300 rounded w-[33%] self-center hover:font-bold">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterForm
