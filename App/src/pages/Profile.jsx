
import React, { useState, useEffect } from 'react'
import { load, save } from '../lib/storage'

export default function Profile() {
  const [form, setForm] = useState(() => (load().profile || {
    firstName: '', lastName: '', sport: 'Football', position: '', gradYear: '',
    gpa: '', height: '', weight: '', email: '', phone: '',
    city: '', state: '', highlightLink: '', transcriptLink: '',
  }))

  useEffect(() => { save({ profile: form }) }, [form])

  function input(name, type='text', placeholder='') {
    return (
      <input
        value={form[name] ?? ''}
        onChange={e => setForm(v => ({ ...v, [name]: e.target.value }))}
        type={type}
        placeholder={placeholder}
        className="w-full border rounded-xl px-3 py-2"
      />
    )
  }

  return (
    <div className="container-xl my-6 space-y-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="text-lg font-semibold mb-4">Athlete Profile</div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>{input('firstName', 'text', 'First name')}</div>
          <div>{input('lastName', 'text', 'Last name')}</div>
          <div>
            <select
              value={form.sport}
              onChange={e => setForm(v => ({ ...v, sport: e.target.value }))}
              className="w-full border rounded-xl px-3 py-2"
            >
              {['Football','Basketball','Baseball','Softball','Soccer','Track & Field','Volleyball'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>{input('position', 'text', 'Primary position (e.g., WR)')}</div>
          <div>{input('gradYear', 'number', 'Graduation year')}</div>
          <div>{input('gpa', 'number', 'GPA')}</div>
          <div>{input('height', 'text', 'Height (e.g., 6\'1\")')}</div>
          <div>{input('weight', 'number', 'Weight (lbs)')}</div>
          <div>{input('email', 'email', 'Email')}</div>
          <div>{input('phone', 'tel', 'Phone')}</div>
          <div>{input('city', 'text', 'City')}</div>
          <div>{input('state', 'text', 'State')}</div>
          <div className="md:col-span-2">{input('highlightLink', 'url', 'Hudl/YouTube highlight link')}</div>
          <div className="md:col-span-2">{input('transcriptLink', 'url', 'Transcript link (Google Drive, etc.)')}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="text-lg font-semibold mb-2">Export / Import</div>
        <div className="flex flex-wrap gap-3">
          <button
            className="px-4 py-2 bg-black text-white rounded-xl"
            onClick={() => {
              const blob = new Blob([JSON.stringify(load(), null, 2)], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url; a.download = 'recruitright_data.json'; a.click()
              URL.revokeObjectURL(url)
            }}
          >Export JSON</button>
          <label className="px-4 py-2 bg-amber-400 rounded-xl cursor-pointer">
            Import JSON
            <input type="file" accept="application/json" className="hidden" onChange={async e => {
              const file = e.target.files?.[0]; if (!file) return
              const text = await file.text()
              try {
                const data = JSON.parse(text)
                localStorage.setItem('recruitright:v1', JSON.stringify(data))
                window.location.reload()
              } catch {
                alert('Invalid JSON')
              }
            }} />
          </label>
        </div>
      </div>
    </div>
  )
}
