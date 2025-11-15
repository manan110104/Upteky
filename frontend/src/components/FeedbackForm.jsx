import { useState } from 'react'
import { submitFeedback } from '../services/api'

const FeedbackForm = ({ onFeedbackAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
    setSuccess(false)
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) {
      return
    }

    setSubmitting(true)
    setSuccess(false)

    try {
      await submitFeedback(formData)
      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        message: '',
        rating: 5
      })
      setErrors({})
      
      // Notify parent component
      if (onFeedbackAdded) {
        onFeedbackAdded()
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Submit Feedback
      </h2>
      
      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          Feedback submitted successfully!
        </div>
      )}

      {errors.submit && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your feedback message"
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              id="rating"
              name="rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              className="flex-1"
            />
            <span className="text-2xl font-bold text-indigo-600 w-12 text-center">
              {formData.rating} ⭐
            </span>
          </div>
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            submitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {submitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  )
}

export default FeedbackForm

