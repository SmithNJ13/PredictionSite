import React, { useState } from 'react';
import { baseURL } from "../../consts/api";
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
    } else {
      alert(responseData.message || "Failed to create user")
    }
    console.log('Form Data Submitted:', formData);
    document.getElementById("register").reset()
  };

  return (
    <>
    <section className="registerForm"> 
      <h1>Register Page!</h1>
      <form onSubmit={handleSubmit} id="register">
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </section>
    </>
  );
}

export default RegisterForm
