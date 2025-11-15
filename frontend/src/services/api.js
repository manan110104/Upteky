import axios from 'axios'

// For development: use proxy from vite.config.js (relative URL)
// For production: use full URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || ''
const isProduction = import.meta.env.PROD

const api = axios.create({
  baseURL: isProduction ? API_BASE_URL : '', // Empty string for dev (uses vite proxy)
  headers: {
    'Content-Type': 'application/json',
  },
})

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await api.post('/api/feedback', feedbackData)
    return response.data
  } catch (error) {
    console.error('Submit feedback error:', error)
    if (error.response) {
      throw new Error(error.response.data.errors?.[0]?.msg || 'Failed to submit feedback')
    }
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      throw new Error('Cannot connect to backend server. Please make sure the backend is running on http://localhost:5000')
    }
    throw new Error(error.message || 'Network error. Please check if the backend server is running.')
  }
}

export const fetchFeedbacks = async (queryParams = '') => {
  try {
    const url = queryParams ? `/api/feedback?${queryParams}` : '/api/feedback'
    const response = await api.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching feedbacks:', error)
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      throw new Error('Cannot connect to backend server. Please make sure the backend is running on http://localhost:5000')
    }
    throw error
  }
}

export const fetchStats = async () => {
  try {
    const response = await api.get('/api/stats')
    return response.data
  } catch (error) {
    console.error('Error fetching stats:', error)
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      throw new Error('Cannot connect to backend server. Please make sure the backend is running on http://localhost:5000')
    }
    throw error
  }
}

export default api

