import { useEffect, useState } from 'react'
import './App.css'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

const initialForm = {
  postProfile: '',
  postDesc: '',
  reqExperience: 0,
  postTechStack: '',
}

function App() {
  const [jobs, setJobs] = useState([])
  const [formData, setFormData] = useState(initialForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchJobs = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await fetch(`${API_BASE}/api/jobs`)
      if (!response.ok) {
        throw new Error('Failed to fetch jobs')
      }
      const data = await response.json()
      setJobs(data)
    } catch (fetchError) {
      setError(fetchError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const resetForm = () => {
    setFormData(initialForm)
    setEditingId(null)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: name === 'reqExperience' ? Number(value) : value,
    }))
  }

  const toPayload = () => ({
    postProfile: formData.postProfile.trim(),
    postDesc: formData.postDesc.trim(),
    reqExperience: Number(formData.reqExperience) || 0,
    postTechStack: formData.postTechStack
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const payload = toPayload()

    try {
      setError('')
      const response = await fetch(
        editingId ? `${API_BASE}/api/jobs/${editingId}` : `${API_BASE}/api/jobs`,
        {
          method: editingId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      )

      if (!response.ok) {
        throw new Error(`Failed to ${editingId ? 'update' : 'create'} job`)
      }

      resetForm()
      await fetchJobs()
    } catch (submitError) {
      setError(submitError.message)
    }
  }

  const handleEdit = (job) => {
    setFormData({
      postProfile: job.postProfile,
      postDesc: job.postDesc,
      reqExperience: job.reqExperience,
      postTechStack: (job.postTechStack ?? []).join(', '),
    })
    setEditingId(job.postid)
  }

  const handleDelete = async (id) => {
    try {
      setError('')
      const response = await fetch(`${API_BASE}/api/jobs/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete job')
      }
      await fetchJobs()
    } catch (deleteError) {
      setError(deleteError.message)
    }
  }

  return (
    <main className="app">
      <h1>Job App</h1>
      <p className="subtitle">React frontend + Spring Boot REST API + Spring Data JPA</p>

      <form onSubmit={handleSubmit} className="job-form">
        <input
          name="postProfile"
          placeholder="Job profile"
          value={formData.postProfile}
          onChange={handleChange}
          required
        />
        <input
          name="postDesc"
          placeholder="Description"
          value={formData.postDesc}
          onChange={handleChange}
          required
        />
        <input
          name="reqExperience"
          type="number"
          min="0"
          placeholder="Experience (years)"
          value={formData.reqExperience}
          onChange={handleChange}
          required
        />
        <input
          name="postTechStack"
          placeholder="Tech stack (comma separated)"
          value={formData.postTechStack}
          onChange={handleChange}
          required
        />
        <div className="actions">
          <button type="submit">{editingId ? 'Update Job' : 'Add Job'}</button>
          {editingId && (
            <button type="button" onClick={resetForm} className="secondary">
              Cancel
            </button>
          )}
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="jobs">
          {jobs.length === 0 ? (
            <p>No jobs found.</p>
          ) : (
            jobs.map((job) => (
              <article key={job.postid} className="job-card">
                <h2>{job.postProfile}</h2>
                <p>{job.postDesc}</p>
                <p>
                  <strong>Experience:</strong> {job.reqExperience} years
                </p>
                <p>
                  <strong>Tech:</strong> {(job.postTechStack ?? []).join(', ')}
                </p>
                <div className="actions">
                  <button type="button" onClick={() => handleEdit(job)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => handleDelete(job.postid)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      )}
    </main>
  )
}

export default App
