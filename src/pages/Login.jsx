import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { user, isAdmin, signIn, resetPassword, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(null)
  const [busy, setBusy] = useState(false)

  if (!loading && user) {
    return <Navigate to={isAdmin ? '/admin' : '/'} replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setBusy(true)
    setStatus(null)

    const { error } = await signIn(email, password)
    setBusy(false)

    if (error) {
      setStatus({ error: true, message: error.message })
      return
    }

    navigate('/')
  }

  async function handleForgot() {
    if (!email) {
      setStatus({ error: true, message: 'Enter your email address first.' })
      return
    }

    const { error } = await resetPassword(email)
    setStatus(
      error
        ? { error: true, message: error.message }
        : { error: false, message: 'Password reset email sent. Check your inbox.' }
    )
  }

  return (
    <main className="auth-page">
      <div className="auth-page-card">
        <div className="auth-number">01</div>
        <p className="auth-small">WELCOME BACK</p>
        <h1>Admin Login</h1>
        <p className="auth-description">
          Sign in to your account. Only accounts marked as administrators can access the dashboard.
        </p>

        {status && (
          <p className={`auth-status ${status.error ? 'is-error' : ''}`}>
            {status.message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              placeholder="admin@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className="form-options">
            <span></span>
            <button type="button" onClick={handleForgot}>Forgot Password?</button>
          </div>

          <button type="submit" className="auth-submit" disabled={busy}>
            {busy ? 'Please wait…' : 'Login →'}
          </button>
        </form>

        <p className="auth-bottom">
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>
        <p className="auth-bottom"><Link to="/">← Back to portfolio</Link></p>
      </div>
    </main>
  )
}
