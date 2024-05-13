import React from "react";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
    duration: 2000
});
// function YourComponent() {
//     // Retrieve the user information from localStorage
//     const user = JSON.parse(localStorage.getItem('currentUser'));

//     // Check if the user is logged in
//     const userIsLoggedIn = user !== null; // Assumes the user data is stored in localStorage
// }
    function Landinscreen() {
        const user = JSON.parse(localStorage.getItem('currentUser'));

        const userIsLoggedIn = user !== null; // Assumes the user data is stored in localStorage

        return (
            <div className="row landing">
                <div className="col-md-12 text-center">

                    <p data-aos='zoom-in' style={{ fontSize: '75px' }}>Luggage Lounge</p>
                    <h1 data-aos='zoom-out'>"Empty your Load and Hit the Road !!!"</h1><br></br>

                    {userIsLoggedIn ? (
                        <Link to='/home'>
                            <button className="btn">Home</button>
                        </Link>
                    ) : (
                        <Link to='/login'>
                            <button className="btn">Get Started</button>
                        </Link>
                    )}


               

            </div>

            </div>
        )
    }

    export default Landinscreen;