import { useEffect, useState } from 'react'

const EMPTY = { title: '', description: '', link: '', image_url: '', tags: '' }

export default function ProjectForm({ initial, onSubmit, onCancel, busy }) {
  const [form, setForm] = useState(EMPTY)

  useEffect(() => {
    setForm(initial ? { ...EMPTY, ...initial } : EMPTY)
  }, [initial])

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form className="auth-card dash-form-wrap" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="p-title">Title</label>
        <input
          id="p-title"
          required
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="p-description">Description</label>
        <textarea
          id="p-description"
          rows={3}
          required
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="p-link">Live link (optional)</label>
          <input
            id="p-link"
            type="url"
            placeholder="https://…"
            value={form.link}
            onChange={(e) => update('link', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="p-image">Image URL (optional)</label>
          <input
            id="p-image"
            type="url"
            placeholder="https://…"
            value={form.image_url}
            onChange={(e) => update('image_url', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="p-tags">Tags (comma separated)</label>
        <input
          id="p-tags"
          placeholder="React, Supabase, CSS"
          value={form.tags}
          onChange={(e) => update('tags', e.target.value)}
        />
      </div>

      <div className="dash-form-actions">
        <button type="submit" className="auth-submit" disabled={busy}>
          {busy ? 'Saving…' : initial ? 'Save changes' : 'Add project'}
        </button>
        {onCancel && (
          <button
            type="button"
            className="btn secondary-btn dash-cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
