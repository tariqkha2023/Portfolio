import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {

  const { user, isAdmin, signOut } = useAuth()

  return (

    <header>

      <nav className="navbar">

        {/* LOGO */}
        <Link to="/" className="logo">
          TK<span>.</span>
        </Link>


        {/* NAVIGATION LINKS */}
        <ul className="nav-links">

          <li>
            <a href="/#home">Home</a>
          </li>

          <li>
            <a href="/#about">About</a>
          </li>

          <li>
            <a href="/#projects">Projects</a>
          </li>

          <li>
            <a href="/#skills">Skills</a>
          </li>

          <li>
            <a href="/#contact">Contact</a>
          </li>

        </ul>


        {/* ACCOUNT AREA */}
        <div className="account-buttons">

          {user ? (

            <div className="logged-in-area">

              <div className="logged-in-buttons">

                {/* ADMIN DASHBOARD */}
                {isAdmin && (

                  <Link
                    to="/admin"
                    className="register-nav-btn"
                  >
                    Dashboard
                  </Link>

                )}


                {/* LOGOUT */}
                <button
                  type="button"
                  className="login-nav-btn"
                  onClick={signOut}
                >
                  Log out
                </button>

              </div>


              {/* SHOW USER ROLE */}
              <p className="logged-in-role">

                You are logged in as{' '}

                <strong>
                  {isAdmin ? 'Admin' : 'User'}
                </strong>

              </p>

            </div>

          ) : (

            <>

              {/* LOGIN */}
              <Link
                to="/login"
                className="login-nav-btn"
              >
                Login
              </Link>


              {/* CREATE ACCOUNT */}
              <Link
                to="/register"
                className="register-nav-btn"
              >
                Create Account
              </Link>

            </>

          )}

        </div>

      </nav>

    </header>

  )
}
