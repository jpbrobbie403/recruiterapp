
import React from 'react'
import { reset } from '../lib/storage'

export default function Settings() {
  return (
    <div className="container-xl my-6 space-y-4">
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="text-lg font-semibold mb-2">Danger Zone</div>
        <button
          className="px-4 py-2 rounded-xl border hover:bg-red-50"
          onClick={() => {
            if (!confirm('This will clear all data stored for this app in your browser. Continue?')) return
            reset(); window.location.reload()
          }}
        >Reset all data</button>
      </div>
    </div>
  )
}
