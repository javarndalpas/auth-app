import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utlis';

export const Login = () => {
  const [LoginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copyLoginInfo = { ...LoginInfo }
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }
  console.log("loginInfo ====>", LoginInfo)


  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = LoginInfo;
    if (!email || !password) {
      return handleError("Email and Password are required");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(LoginInfo)
      })
      const result = await response.json();
      console.log(result);
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        setLoginInfo({
          name: "",
          email: "",
          password: ""
        });
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        handleSuccess(message)
        setTimeout(() => {
          navigate("/home")
        }, 1000)
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      }
      else if (!success) {
        handleError(message)
      }
    }
    catch (err) {
      handleError(err)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email"></label>
          <input type="email"
            onChange={handleChange}
            placeholder='Enter your email'
            autoFocus
            name='email'
            value={LoginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input type="password"
            onChange={handleChange}
            placeholder='Enter your password'
            autoFocus
            name='password'
            value={LoginInfo.password}
          />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
        <div>
          <span>Already have an account?
            <Link to="/signup">Signup</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}
