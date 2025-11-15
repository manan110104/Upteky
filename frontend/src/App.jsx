import { useState, useEffect } from 'react'
import FeedbackForm from './components/FeedbackForm'
import FeedbackTable from './components/FeedbackTable'
import AnalyticsCards from './components/AnalyticsCards'
import { fetchFeedbacks, fetchStats } from './services/api'
import './App.css'

// Get API URL for CSV export (full URL needed for download)
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '')

function App() {
  const [feedbacks, setFeedbacks] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    positive: 0,
    negative: 0,
    neutral: 0
  })
  const [loading, setLoading] = useState(true)
  const [filterRating, setFilterRating] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadData()
  }, [filterRating, searchTerm])

  const loadData = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filterRating) params.append('rating', filterRating)
      if (searchTerm) params.append('search', searchTerm)
      
      const [feedbacksData, statsData] = await Promise.all([
        fetchFeedbacks(params.toString()),
        fetchStats()
      ])
      
      console.log('Stats received from API:', statsData)
      
      setFeedbacks(feedbacksData)
      setStats(statsData)
    } catch (error) {
      console.error('Error loading data:', error)
      alert('Failed to load data. Make sure the backend server is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleFeedbackAdded = () => {
    loadData()
  }

  const handleExportCSV = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/feedback/export`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'feedbacks.csv'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error exporting CSV:', error)
      alert('Failed to export CSV')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Feedback Management Dashboard
          </h1>
          <p className="text-gray-600">
            Submit feedback, view submissions, and analyze insights
          </p>
        </header>

        <AnalyticsCards stats={stats} loading={loading} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <FeedbackForm onFeedbackAdded={handleFeedbackAdded} />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Filters & Actions
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Rating
                </label>
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, email, or message..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleExportCSV}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Export to CSV
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <FeedbackTable 
            feedbacks={feedbacks} 
            loading={loading}
            onRefresh={loadData}
          />
        </div>
      </div>
    </div>
  )
}

export default App

