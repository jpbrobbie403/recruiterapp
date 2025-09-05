
import React from 'react'
import StatCard from '../components/StatCard'

export default function Dashboard({ data }) {
  const tracker = data.tracker || []
  const profile = data.profile || {}
  const offers = tracker.filter(t => t.stage === 'Offer').length
  const applied = tracker.filter(t => t.stage === 'Applied').length
  const contacted = tracker.filter(t => t.stage === 'Contacted').length

  return (
    <div className="container-xl my-6 space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Schools tracked" value={tracker.length} />
        <StatCard label="Contacted" value={contacted} />
        <StatCard label="Applied" value={applied} />
        <StatCard label="Offers" value={offers} />
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="text-lg font-semibold mb-2">Welcome{profile.firstName ? `, ${profile.firstName}` : ''} 👋</div>
        <p className="text-slate-600">
          Use the tabs to build your profile, find colleges, track recruiting progress, and send polished emails.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="text-lg font-semibold mb-4">Next steps</div>
        <ol className="list-decimal pl-5 space-y-2 text-slate-700">
          <li>Complete your Profile with GPA, grad year, position, and highlights.</li>
          <li>Search Colleges and add 10 programs to your Tracker.</li>
          <li>Use Email to introduce yourself to coaches — personalize 3 messages.</li>
        </ol>
      </div>
    </div>
  )
}
