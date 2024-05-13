import React from 'react';

function Navbar(props) {

  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  }

  const user = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/">
          <img className="logo" src="./logo1.png" alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {user ? (
              <>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.name}
                  </button>
                  <ul className="dropdown-menu blacky" aria-labelledby="dropdownMenuButton1">
                    {/* <li><a class="dropdown-item btn" href="/profile">Profile</a></li> */}
                    <li>
                      <a className="dropdown-item btn" href="#" onClick={logout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
                <a className="nav-link" href="/home">
                  Home
                </a>
                <a className="nav-link kakakaka" href="/profile">
                  Profile
                </a>
              </>
            ) : (
              <>
                <li className="nav-item kakakaka">
                  <a className="nav-link" href="/home">
                    Home
                  </a>
                </li>
                <li className="nav-item active kakakaka">
                  <a className="nav-link" href="/register">
                    SignUp
                  </a>
                </li>
                <li className="nav-item kakakaka">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
