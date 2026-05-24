import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`
})

export const analyzeCode = (code, language) =>
  api.post('/analyze', { code, language }).then(r => r.data)

export const generateQuiz = (algorithm_name, category, key_insight) =>
  api.post('/quiz', { algorithm_name, category, key_insight }).then(r => r.data)

export const compareAlgos = (code1, lang1, code2, lang2) =>
  api.post('/compare', { code1, lang1, code2, lang2 }).then(r => r.data)

export const healthCheck = () =>
  api.get('/health').then(r => r.data)
