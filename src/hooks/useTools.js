import { useState, useEffect } from 'react'
import { getTools } from '../services/firebase/toolsService'

export default function useTools() {
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getTools()
      .then(setTools)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { tools, loading, error }
}
