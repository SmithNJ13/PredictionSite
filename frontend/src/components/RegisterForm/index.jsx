import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../consts/api";

const RegisterForm = () => {
  const nav = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState('');

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  };

  const validateUsername = (username) => {
    if (username.length > 20) {
      return "Username must be 20 characters or less";
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      return "Username can only contain letters and numbers";
    }
    return null;
  };

  const validateEmail = (email) => {
    const validDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com','gmail.co.uk', 'yahoo.co.uk', 'hotmail.co.uk', 'outlook.co.uk',
      'live.com', 'live.co.uk', 'test.com'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    
    const domain = email.split('@')[1];
    if (!validDomains.includes(domain)) {
      return `Email can only be from: gmail, yahoo, hotmail, outlook or live (.com or .co.uk)`;
    }
    
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for username field
    if (name === 'username') {
      // Check for length limit
      if (value.length > 20) {
        showToast('Username cannot exceed 20 characters');
        return;
      }
      
      // Check for invalid characters (spaces, special characters)
      if (value && !/^[a-zA-Z0-9]*$/.test(value)) {
        if (/\s/.test(value)) {
          showToast('Username cannot contain spaces');
        } else {
          showToast('Username can only contain letters and numbers');
        }
        return;
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate all fields
    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const newErrors = {
      username: usernameError,
      email: emailError
    };
    setErrors(newErrors);

    // If there are any errors, don't submit
    if (usernameError || emailError) {
      return;
    }
    setLoading(true)
    const options = {
      method: "POST",
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }

    try {
      const response = await fetch(`${baseURL}/users/register`, options);
      const responseData = await response.json();
      
      if (response.status === 201) {
        console.log("User successfully created");
        setFormData({
          username: '',
          email: '',
          password: '',
        });
        nav("/login")
      } else {
        alert(responseData.message || "Failed to create user");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
          {toast}
        </div>
      )}
      
      <h1 id="title" className="text-SpringGreen text-center text-4xl underline mt-8">Register Page</h1>
      <div id="content" className="flex flex-col gap-[10px] h-full w-full mt-4">
        <div className="self-center bg-GunMetal p-[1rem] rounded-[10px] w-[30rem]">
          <form onSubmit={handleSubmit} id="register" className="flex flex-col gap-[20px] px-[1rem]" autoComplete="off">
            <section className="top flex flex-col">
              <label className="text-AshGray self-start">Username:</label>
              <input 
                className={`emailbox p-[10px] rounded-[5px] border ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="JaneDoe1"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              {errors.username && <span className="text-red-500 text-sm mt-1">{errors.username}</span>}
            </section>
            
            <section className="middle flex flex-col">
              <label className="text-AshGray self-start">Email:</label>
              <input 
                className={`emailbox p-[10px] rounded-[5px] border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="JaneDoe@gmail.com"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
            </section>
            
            <section className="bottom flex flex-col">
              <label className="text-AshGray self-start">Password:</label>
              <input 
                className="passbox p-[10px] rounded-[5px] border border-gray-300"
                placeholder="Enter password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </section>
            
            <button type="submit" disabled={loading} className="m-[1rem] p-[2px] text-SpringGreen border-[2px] border-gray-300 rounded w-[33%] self-center hover:font-bold">
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
                </div>
              ) : ( "Submit" )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;