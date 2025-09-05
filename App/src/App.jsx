
import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Colleges from './pages/Colleges'
import Tracker from './pages/Tracker'
import Email from './pages/Email'
import Settings from './pages/Settings'
import { load } from './lib/storage'

export default function App() {
  const [tab, setTab] = useState('dashboard')
  const data = load()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar active={tab} onChange={setTab} />
      <main className="flex-1">
        {tab === 'dashboard' && <Dashboard data={data} />}
        {tab === 'profile' && <Profile />}
        {tab === 'colleges' && <Colleges />}
        {tab === 'tracker' && <Tracker />}
        {tab === 'email' && <Email />}
        {tab === 'settings' && <Settings />}
      </main>
      <footer className="text-center text-xs text-slate-500 py-6">
        © RecruitRight — made for student-athletes
      </footer>
    </div>
  )
}
