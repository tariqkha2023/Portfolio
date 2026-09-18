import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, isAdmin, signOut } = useAuth()

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="logo">TK<span>.</span></Link>

        <ul className="nav-links">
          <li><a href="/#home">Home</a></li>
          <li><a href="/#about">About</a></li>
          <li><a href="/#projects">Projects</a></li>
          <li><a href="/#skills">Skills</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>

        <div className="account-buttons">
          {user ? (
            <>
              {isAdmin && <Link to="/admin" className="register-nav-btn">Dashboard</Link>}
              <button className="login-nav-btn" onClick={signOut}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-nav-btn">Login</Link>
              <Link to="/register" className="register-nav-btn">Create Account</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
