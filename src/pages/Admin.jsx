import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'
import ProjectForm from '../components/ProjectForm'

export default function Admin() {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null) // null = not editing, {} = new, object = existing
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (user) loadProjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  async function loadProjects() {
    setLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setProjects(data ?? [])
    setLoading(false)
  }

  async function handleSave(form) {
    setBusy(true)
    setError('')
    const payload = { ...form, owner_id: user.id }

    const result = editing?.id
      ? await supabase.from('projects').update(payload).eq('id', editing.id)
      : await supabase.from('projects').insert(payload)

    setBusy(false)
    if (result.error) {
      setError(result.error.message)
      return
    }
    setEditing(null)
    loadProjects()
  }

  async function handleDelete(id) {
    if (!confirm('Delete this project? This cannot be undone.')) return
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) setError(error.message)
    else loadProjects()
  }

  if (authLoading) return null
  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />

  return (
    <main className="dash">
      <div className="dash-head">
        <div>
          <p className="section-small-title">Dashboard</p>
          <h2>Manage projects</h2>
          <p className="dash-signed">Signed in as {user.email}</p>
        </div>
        <div className="hero-buttons">
          <a href="/" className="btn secondary-btn">View live site</a>
          <button className="btn primary-btn" onClick={signOut}>Log out</button>
        </div>
      </div>

      {error && <p className="dash-error">{error}</p>}

      {editing ? (
        <ProjectForm
          initial={editing.id ? editing : null}
          busy={busy}
          onCancel={() => setEditing(null)}
          onSubmit={handleSave}
        />
      ) : (
        <button className="btn primary-btn dash-add" onClick={() => setEditing({})}>
          + Add a project
        </button>
      )}

      <div className="dash-list">
        {loading && <p>Loading…</p>}
        {!loading && projects.length === 0 && (
          <p className="dash-empty">Nothing here yet — add your first project above.</p>
        )}
        {projects.map((p) => (
          <div key={p.id} className="dash-row">
            <div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
            <div className="dash-row-actions">
              <button onClick={() => setEditing(p)}>Edit</button>
              <button className="dash-delete-btn" onClick={() => handleDelete(p.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
