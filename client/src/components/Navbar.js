import React from 'react'

function Navbar(props) {

    function logout (){
        localStorage.removeItem('currentUser')
        window.location.href = '/login'
    }


    const user = JSON.parse(localStorage.getItem('currentUser'))
    return (
        <div>
            <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="/"><img className='logo' src="./logo1.png" alt="" /></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        {user ? (<>

                            <div class="dropdown  ">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user.name}
                                </button>
                                <ul class="dropdown-menu blacky" aria-labelledby="dropdownMenuButton1">

                                    {/* <li><a class="dropdown-item btn" href="/profile">Profile</a></li> */}
                                    <li><a class="dropdown-item btn" href="#" onClick={logout}>Logout</a></li>

                                </ul>
                            </div>
                            <a class="nav-link" href="/home">Home</a>
                            <a class="nav-link kakakaka" href="/profile">Profile</a>
                        </>) : (<>
                            <li class="nav-item kakakaka">
                                <a class="nav-link" href="/home">Home</a>
                            </li>

                            <li class="nav-item active kakakaka">
                                <a class="nav-link" href="/register"> SignUp</a>
                            </li>
                            <li class="nav-item kakakaka">
                                <a class="nav-link" href="/login">Login</a>
                            </li></>)}
                    </ul>
                </div>
            </nav>        </div>
    )
}
export default Navbar;