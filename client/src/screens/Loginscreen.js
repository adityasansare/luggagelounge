import { useState } from "react";
import React from 'react';
import axios from 'axios';
import Error from "../components/Error";
import Loader from "../components/Loader";


function Loginscreen() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const [error, seterror] = useState('');
    const [loading, setloading] = useState(false);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            login();
        }
    };

    async function login() {
        const user = {
            email,
            password,
        };

        try {
            setloading(true);
            const result = await axios.post('https://luggagelounge-server.vercel.app/api/users/login', user, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            });
            setloading(false);
            localStorage.setItem('currentUser', JSON.stringify(result.data));
            window.location.href = '/home';

        } catch (error) {
            console.log(error);
            seterror(true);
            setloading(false);
        }
    }

    return (
        <div className="container">
            {loading && (<Loader/>)}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5">
                {error && (<Error message='Invalid Credentials'/>)}
                    <div className="bs blacky ">
                        <h2>Login</h2>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => { setemail(e.target.value) }}
                            onKeyPress={handleKeyPress} // Handle Enter key press
                        />

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setpassword(e.target.value) }}
                            onKeyPress={handleKeyPress} // Handle Enter key press
                        />

                        <button
                            className="btn mt-3"
                            onClick={login}
                        >
                            Login
                        </button>
                        <p className="aabbcc mt-3 ">Don't have an account? <a className="ttbt blacky" href="/register">SignUp</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loginscreen;
