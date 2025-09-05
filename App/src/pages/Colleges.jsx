
import React, { useMemo, useState } from 'react'
import colleges from '../data/colleges.json'
import CollegeCard from '../components/CollegeCard'
import { load, save } from '../lib/storage'

export default function Colleges() {
  const [q, setQ] = useState('')
  const [state, setState] = useState('All')
  const [division, setDivision] = useState('All')

  const states = useMemo(() => ['All', ...Array.from(new Set(colleges.map(c => c.state)))].sort(), [])
  const divisions = useMemo(() => ['All', ...Array.from(new Set(colleges.map(c => c.division)))], [])

  const filtered = colleges.filter(c =>
    (state === 'All' || c.state === state) &&
    (division === 'All' || c.division === division) &&
    (q === '' || (c.name + ' ' + c.city + ' ' + c.state).toLowerCase().includes(q.toLowerCase()))
  )

  function addToTracker(college) {
    const data = load()
    const tracker = data.tracker || []
    if (tracker.some(t => t.id === college.id)) return alert('Already tracking this school.')
    tracker.push({ id: college.id, college: college.name, state: college.state, division: college.division, stage: 'Interested', notes: '' })
    save({ tracker })
    alert('Added to Tracker')
  }

  return (
    <div className="container-xl my-6 space-y-4">
      <div className="bg-white rounded-2xl shadow p-4 flex flex-col sm:flex-row gap-3">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search schools or cities..."
               className="flex-1 border rounded-xl px-3 py-2" />
        <select value={state} onChange={e => setState(e.target.value)} className="border rounded-xl px-3 py-2">
          {states.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={division} onChange={e => setDivision(e.target.value)} className="border rounded-xl px-3 py-2">
          {divisions.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c => <CollegeCard key={c.id} college={c} onAdd={addToTracker} />)}
      </div>
    </div>
  )
}
