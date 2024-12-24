import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../utlis';

export const Signup = () => {
    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        const copySignupInfo = { ...signupInfo }
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    console.log("loginInfo ====>", signupInfo)
    const handleSignup = (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError("Name, email and Password are required");
        }
        // try{
        //     const url = "http//localhost:8080/auth/signup";
        //     const response = await fetch(url{
        //         method:'POST',
        //         body:'application/json'
        //     })
        // }
    }

    return (
        <div>
            <h1>Signup</h1>
            <form action={handleSignup}>
                <div>
                    <label htmlFor="name"></label>
                    <input type="text"
                        onChange={handleChange}
                        placeholder='Enter your name'
                        autoFocus
                        name='name'
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor="email"></label>
                    <input type="email"
                        onChange={handleChange}
                        placeholder='Enter your email'
                        autoFocus
                        name='email'
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor="password"></label>
                    <input type="password"
                        onChange={handleChange}
                        placeholder='Enter your password'
                        autoFocus
                        name='password'
                        value={signupInfo.password}
                    />
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
                <div>

                    <span>Already have an account?
                        <Link to="/login">Login</Link>
                    </span>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
