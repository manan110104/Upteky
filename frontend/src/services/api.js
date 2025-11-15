import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await api.post('/api/feedback', feedbackData)
    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.errors?.[0]?.msg || 'Failed to submit feedback')
    }
    throw new Error('Network error. Please check if the backend server is running.')
  }
}

export const fetchFeedbacks = async (queryParams = '') => {
  try {
    const url = queryParams ? `/api/feedback?${queryParams}` : '/api/feedback'
    const response = await api.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching feedbacks:', error)
    throw error
  }
}

export const fetchStats = async () => {
  try {
    const response = await api.get('/api/stats')
    return response.data
  } catch (error) {
    console.error('Error fetching stats:', error)
    throw error
  }
}

export default api

