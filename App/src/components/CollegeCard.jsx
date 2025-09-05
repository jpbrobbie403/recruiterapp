
import React from 'react'
export default function CollegeCard({ college, onAdd }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold text-lg">{college.name}</div>
          <div className="text-sm text-slate-500">{college.city}, {college.state} • {college.division}</div>
        </div>
        <button onClick={() => onAdd(college)} className="px-3 py-1.5 bg-amber-400 rounded-full text-sm font-medium hover:brightness-95">
          Track
        </button>
      </div>
      {college.website && <a className="text-sm underline" href={college.website} target="_blank" rel="noreferrer">Website</a>}
      {college.notes && <div className="text-sm text-slate-600">{college.notes}</div>}
    </div>
  )
}
