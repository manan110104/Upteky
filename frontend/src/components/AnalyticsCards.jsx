const AnalyticsCards = ({ stats, loading }) => {
  const cards = [
    {
      title: 'Total Feedbacks',
      value: stats.total,
      icon: '📊',
      color: 'bg-blue-500',
      bgGradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Positive (4+)',
      value: stats.positive,
      icon: '✅',
      color: 'bg-green-500',
      bgGradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Negative (<3)',
      value: stats.negative,
      icon: '❌',
      color: 'bg-red-500',
      bgGradient: 'from-red-500 to-red-600'
    },
    {
      title: 'Neutral (3)',
      value: stats.neutral,
      icon: '➖',
      color: 'bg-gray-500',
      bgGradient: 'from-gray-500 to-gray-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${card.bgGradient} rounded-lg shadow-lg p-6 text-white transform hover:scale-105 transition-transform`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl">{card.icon}</div>
            {loading && (
              <div className="animate-pulse">
                <div className="h-4 w-4 bg-white rounded-full opacity-50"></div>
              </div>
            )}
          </div>
          <div className="text-3xl font-bold mb-1">
            {loading ? '...' : card.value}
          </div>
          <div className="text-sm opacity-90">{card.title}</div>
        </div>
      ))}
    </div>
  )
}

export default AnalyticsCards

