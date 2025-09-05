
import React from 'react'

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'profile', label: 'Profile' },
  { id: 'colleges', label: 'Colleges' },
  { id: 'tracker', label: 'Tracker' },
  { id: 'email', label: 'Email' },
  { id: 'settings', label: 'Settings' },
]

export default function Navbar({ active, onChange }) {
  return (
    <header className="bg-black text-white">
      <div className="max-w-6xl mx-auto py-3 flex items-center gap-4 px-4">
        <div className="text-xl font-bold tracking-tight">RecruitRight</div>
        <nav className="flex gap-2 flex-wrap">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={
                "px-3 py-1.5 rounded-full text-sm " +
                (active === t.id ? "bg-amber-400 text-black" : "hover:bg-white/10")
              }
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
