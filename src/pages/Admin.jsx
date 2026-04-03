import { useState, useEffect, useCallback } from 'react'
import { Trash2, RefreshCw, LogOut, Mail, User, Clock } from 'lucide-react'

const API_URL = import.meta.env.VITE_ADMIN_API_URL || 'http://localhost:8000'
const SESSION_KEY = 'admin_token'

// ── Token gate ─────────────────────────────────────────────────────────────

function TokenGate({ onAuth }) {
  const [token, setToken] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const res = await fetch(`${API_URL}/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        sessionStorage.setItem(SESSION_KEY, token)
        onAuth(token)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white border-[3px] border-black shadow-[6px_6px_0px_black] p-8 flex flex-col gap-6 w-full max-w-sm"
      >
        <div>
          <h1 className="font-black text-2xl uppercase tracking-tight">Admin</h1>
          <p className="font-bold text-sm text-neutral-500 mt-1">Contacts dashboard</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-black uppercase text-xs tracking-widest">API Token</label>
          <input
            type="password"
            value={token}
            onChange={e => setToken(e.target.value)}
            required
            placeholder="Bearer token..."
            className="border-[3px] border-black px-4 py-3 font-bold text-sm bg-white focus:outline-none focus:shadow-[4px_4px_0px_black] transition-shadow"
          />
          {error && (
            <p className="font-bold text-xs text-red-600 border-[2px] border-red-400 bg-red-50 px-3 py-2">
              Invalid token. Try again.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 border-[3px] border-black font-black uppercase text-sm tracking-widest py-3 shadow-[4px_4px_0px_black] hover:shadow-[2px_2px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Checking...' : 'Enter →'}
        </button>
      </form>
    </div>
  )
}

// ── Contact card ────────────────────────────────────────────────────────────

function ContactCard({ contact, onDelete }) {
  const [deleting, setDeleting] = useState(false)

  function formatDate(iso) {
    if (!iso) return '—'
    return new Date(iso).toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  async function handleDelete() {
    if (!confirm(`Delete message from ${contact.name}?`)) return
    setDeleting(true)
    await onDelete(contact.id)
    setDeleting(false)
  }

  return (
    <div className="bg-white border-[3px] border-black shadow-[4px_4px_0px_black] p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <User size={14} strokeWidth={3} />
            <span className="font-black text-sm uppercase tracking-wide">{contact.name}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-500">
            <Mail size={13} strokeWidth={2.5} />
            <a
              href={`mailto:${contact.email}`}
              className="font-bold text-xs hover:underline"
            >
              {contact.email}
            </a>
          </div>
        </div>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="border-[2px] border-black bg-red-400 px-3 py-1.5 font-black text-xs uppercase tracking-wide shadow-[2px_2px_0px_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Trash2 size={12} strokeWidth={3} />
          {deleting ? '...' : 'Delete'}
        </button>
      </div>

      {/* Message */}
      <p className="font-bold text-sm text-neutral-700 border-l-[3px] border-yellow-400 pl-3 leading-relaxed">
        {contact.message}
      </p>

      {/* Date */}
      <div className="flex items-center gap-1.5 text-neutral-400">
        <Clock size={12} strokeWidth={2.5} />
        <span className="font-bold text-xs">{formatDate(contact.createdAt)}</span>
      </div>
    </div>
  )
}

// ── Dashboard ───────────────────────────────────────────────────────────────

function Dashboard({ token, onLogout }) {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchContacts = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch(`${API_URL}/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error()
      setContacts(await res.json())
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => { fetchContacts() }, [fetchContacts])

  async function handleDelete(id) {
    await fetch(`${API_URL}/contacts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    setContacts(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Top bar */}
      <header className="bg-white border-b-[3px] border-black px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-black text-xl uppercase tracking-tight">Contacts</h1>
          {!loading && !error && (
            <p className="font-bold text-xs text-neutral-500">
              {contacts.length} message{contacts.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchContacts}
            className="border-[2px] border-black px-3 py-1.5 font-black text-xs uppercase tracking-wide shadow-[2px_2px_0px_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw size={12} strokeWidth={3} />
            Refresh
          </button>
          <button
            onClick={onLogout}
            className="border-[2px] border-black px-3 py-1.5 font-black text-xs uppercase tracking-wide shadow-[2px_2px_0px_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <LogOut size={12} strokeWidth={3} />
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-6 py-8">
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-24">
            <RefreshCw size={32} strokeWidth={3} className="animate-spin text-black" />
            <span className="font-black uppercase text-sm tracking-widest text-neutral-500">Loading...</span>
          </div>
        )}

        {error && (
          <div className="border-[3px] border-black bg-red-100 px-5 py-4 font-bold text-sm">
            Failed to load contacts. Check that the API is running.
          </div>
        )}

        {!loading && !error && contacts.length === 0 && (
          <div className="border-[3px] border-black bg-white shadow-[4px_4px_0px_black] px-6 py-10 text-center">
            <p className="font-black text-2xl mb-2">0</p>
            <p className="font-bold text-sm text-neutral-500 uppercase tracking-widest">No messages yet</p>
          </div>
        )}

        {!loading && !error && contacts.length > 0 && (
          <div className="flex flex-col gap-4">
            {contacts.map(c => (
              <ContactCard key={c.id} contact={c} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem(SESSION_KEY) || null)

  useEffect(() => {
    document.title = 'Admin — Marco Piermatei'
    return () => { document.title = 'Marco Piermatei — Frontend Developer' }
  }, [])

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY)
    setToken(null)
  }

  if (!token) return <TokenGate onAuth={setToken} />
  return <Dashboard token={token} onLogout={handleLogout} />
}
