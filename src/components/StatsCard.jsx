import React from 'react'

const StatsCard = ({ value, label }) => {
  return (
    <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100">
      <div className="text-3xl font-bold text-blue-600 mb-2">
        {value}
      </div>
      <div className="text-sm text-gray-600">
        {label}
      </div>
    </div>
  )
}

export default StatsCard
