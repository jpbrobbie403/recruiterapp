
import React, { useMemo, useState } from 'react'
import { load, save } from '../lib/storage'

const STAGES = ['Interested', 'Contacted', 'Applied', 'Visit', 'Offer', 'Committed']

export default function Tracker() {
  const [tracker, setTracker] = useState(() => load().tracker || [])
  const [filter, setFilter] = useState('All')

  function update(index, patch) {
    const next = tracker.map((t, i) => i === index ? { ...t, ...patch } : t)
    setTracker(next); save({ tracker: next })
  }

  function remove(index) {
    if (!confirm('Remove this school from your tracker?')) return
    const next = tracker.filter((_, i) => i !== index)
    setTracker(next); save({ tracker: next })
  }

  const visible = useMemo(() => tracker.filter(t => filter === 'All' || t.stage === filter), [tracker, filter])

  return (
    <div className="container-xl my-6 space-y-4">
      <div className="flex items-center gap-3">
        <select value={filter} onChange={e => setFilter(e.target.value)} className="border rounded-xl px-3 py-2">
          {['All', ...STAGES].map(s => <option key={s}>{s}</option>)}
        </select>
        <button className="px-3 py-2 bg-amber-400 rounded-xl" onClick={() => {
          if (!tracker.length) return alert('Nothing to export')
          const csv = ['College,State,Division,Stage,Notes']
            .concat(tracker.map(t => [t.college, t.state, t.division, t.stage, JSON.stringify(t.notes||'')].join(',')))
            .join('\n')
          const blob = new Blob([csv], {type:'text/csv'})
          const url = URL.createObjectURL(blob); const a = document.createElement('a')
          a.href = url; a.download = 'recruit_tracker.csv'; a.click(); URL.revokeObjectURL(url)
        }}>Export CSV</button>
      </div>

      <div className="grid gap-3">
        {visible.map((t, i) => (
          <div key={t.id} className="bg-white rounded-2xl shadow p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="font-semibold text-lg flex-1">{t.college}</div>
              <select value={t.stage} onChange={e => update(i, { stage: e.target.value })}
                      className="border rounded-xl px-3 py-2">
                {STAGES.map(s => <option key={s}>{s}</option>)}
              </select>
              <button onClick={() => remove(i)} className="px-3 py-2 rounded-xl border hover:bg-red-50">Remove</button>
            </div>
            <div className="text-sm text-slate-500 mt-1">{t.state} • {t.division}</div>
            <textarea
              value={t.notes || ''}
              onChange={e => update(i, { notes: e.target.value })}
              placeholder="Notes (camp dates, coach names, call times, offer details)…"
              className="w-full border rounded-xl px-3 py-2 mt-3"
              rows={3}
            />
          </div>
        ))}
        {!visible.length && (
          <div className="text-sm text-slate-500">No schools here yet. Add some from the Colleges tab.</div>
        )}
      </div>
    </div>
  )
}
