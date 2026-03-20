import { useState, useEffect } from 'react'
import { getProjects } from '../services/firebase/projectsService'

export default function useProjects() {
  const [featured, setFeatured] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProjects()
      .then(all => {
        setFeatured(all.find(p => p.featured) ?? null)
        setProjects(all.filter(p => !p.featured))
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { featured, projects, loading, error }
}
