import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { user, signUp, loading } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState(null)
  const [busy, setBusy] = useState(false)

  if (!loading && user) return <Navigate to="/" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus(null)

    if (password !== confirm) {
      setStatus({ error: true, message: 'Passwords do not match.' })
      return
    }

    setBusy(true)
    const { data, error } = await signUp(email, password, name)
    setBusy(false)

    if (error) {
      setStatus({ error: true, message: error.message })
      return
    }

    if (data.session) {
      navigate('/')
      return
    }

    setStatus({
      error: false,
      message: 'Account created. Check your email to confirm your account, then log in.'
    })
  }

  return (
    <main className="auth-page">
      <div className="auth-page-card register-page-card">
        <div className="auth-number">02</div>
        <p className="auth-small">NEW ACCOUNT</p>
        <h1>Create Account</h1>
        <p className="auth-description">
          Registration creates a normal user account. Dashboard access is granted separately by the site administrator.
        </p>

        {status && (
          <p className={`auth-status ${status.error ? 'is-error' : ''}`}>
            {status.message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="register-name">Full Name</label>
            <input
              id="register-name"
              type="text"
              placeholder="Your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-email">Email Address</label>
            <input
              id="register-email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Create Password</label>
            <input
              id="register-password"
              type="password"
              placeholder="At least 6 characters"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Enter password again"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <label className="terms">
            <input type="checkbox" required />
            <span>I agree to the Terms &amp; Privacy Policy</span>
          </label>

          <button type="submit" className="auth-submit" disabled={busy}>
            {busy ? 'Please wait…' : 'Create Account →'}
          </button>
        </form>

        <p className="auth-bottom">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <p className="auth-bottom"><Link to="/">← Back to portfolio</Link></p>
      </div>
    </main>
  )
}
