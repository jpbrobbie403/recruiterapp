
import React, { useMemo } from 'react'
import { load } from '../lib/storage'

export default function Email() {
  const data = load()
  const profile = data.profile || {}
  const tracker = data.tracker || []

  const signature = useMemo(() => {
    const parts = [
      `${profile.firstName||''} ${profile.lastName||''}`.trim(),
      `${profile.sport||''} • ${profile.position||''}`.trim(),
      `Class of ${profile.gradYear||''}`.trim(),
      profile.city && profile.state ? `${profile.city}, ${profile.state}` : (profile.city || profile.state || ''),
      profile.email || '',
      profile.phone || '',
      profile.highlightLink ? `Highlights: ${profile.highlightLink}` : ''
    ].filter(Boolean)
    return parts.join('\n')
  }, [profile])

  const draft = (college='[College Name]') => {
    return `Subject: ${profile.firstName||'Student-Athlete'} – ${profile.position||profile.sport||''} (${profile.gradYear||'Grad Year'})

Coach,
My name is ${profile.firstName||'[First]'} ${profile.lastName||'[Last]'}, a ${profile.position||''} in the class of ${profile.gradYear||''}. I currently attend ${profile.city||''}${profile.state?', '+profile.state:''}. My GPA is ${profile.gpa||'[GPA]'}.
I’m very interested in ${college} and believe I would be a great fit for your program.

Highlights: ${profile.highlightLink||'[link]'}
Transcript: ${profile.transcriptLink||'[link]'} 

Thank you for your time — I’d welcome the chance to talk or visit campus.
\n${signature}`
  }

  return (
    <div className="container-xl my-6 space-y-4">
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="text-lg font-semibold mb-2">Email Wizard</div>
        <p className="text-sm text-slate-600 mb-4">Your profile auto-fills the details. Click a school to copy a ready-to-send email.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tracker.map(t => (
            <button
              key={t.id}
              onClick={() => { navigator.clipboard.writeText(draft(t.college)); alert('Draft copied!') }}
              className="text-left bg-slate-100 hover:bg-slate-200 rounded-2xl p-4"
            >
              <div className="font-semibold">{t.college}</div>
              <div className="text-xs text-slate-600">{t.state} • {t.division}</div>
              <div className="text-xs mt-2 opacity-70">Click to copy draft</div>
            </button>
          ))}
        </div>
        {!tracker.length && <div className="text-sm text-slate-500">Add schools to your Tracker to generate emails.</div>}
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="font-semibold mb-2">Blank Template</div>
        <textarea
          readOnly
          value={draft()}
          className="w-full border rounded-xl px-3 py-2 font-mono text-sm h-64"
        />
        <button className="mt-3 px-4 py-2 bg-black text-white rounded-xl" onClick={() => {
          navigator.clipboard.writeText(draft()); alert('Template copied!')
        }}>Copy Template</button>
      </div>
    </div>
  )
}
