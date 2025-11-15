const FeedbackTable = ({ feedbacks, loading, onRefresh }) => {
  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-600'
    if (rating === 3) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (loading && feedbacks.length === 0) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            All Feedbacks
          </h2>
        </div>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading feedbacks...</p>
        </div>
      </div>
    )
  }

  if (feedbacks.length === 0) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            All Feedbacks
          </h2>
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Refresh
          </button>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-600">No feedbacks found. Be the first to submit!</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          All Feedbacks ({feedbacks.length})
        </h2>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {feedbacks.map((feedback) => (
              <tr key={feedback.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {feedback.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    {feedback.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-semibold ${getRatingColor(feedback.rating)}`}>
                    {feedback.rating} {getRatingStars(feedback.rating)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-700 max-w-md truncate" title={feedback.message}>
                    {feedback.message}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    {new Date(feedback.createdAt).toLocaleString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FeedbackTable

