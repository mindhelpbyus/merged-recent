
import { Link } from 'react-router-dom'
import { load } from '../utils/storage'
import { DOCTORS } from '../data/doctors'
export default function Patient(){
  const ses = load('session'); const appts = load('appointments', []).filter(a=>a.patientId===ses?.id)
  const visits = appts.filter(a=>a.status==='completed')
  return (<div className="max-w-7xl mx-auto px-4 py-10">
    <h2 className="text-2xl font-bold">Patient Dashboard</h2>
    <div className="mt-6 grid md:grid-cols-2 gap-4">
      <div className="bg-white border rounded-2xl p-6">
        <h3 className="font-semibold">Upcoming</h3>
        <ul className="mt-3 space-y-2">{appts.filter(a=>a.status!=='completed').map(a=>{
          const d = DOCTORS.find(x=>x.id===a.doctorId)
          return <li key={a.id} className="flex items-center justify-between"><span>{new Date(a.when).toLocaleString()} • {d?.name}</span><Link className="text-gray-900 underline" to={`/appointment/${a.id}`}>Details</Link></li>
        })}</ul>
      </div>
      <div className="bg-white border rounded-2xl p-6">
        <h3 className="font-semibold">Previous Visits</h3>
        <ul className="mt-3 space-y-2">{visits.map(a=>{
          const d = DOCTORS.find(x=>x.id===a.doctorId)
          return <li key={a.id} className="flex items-start justify-between"><span>{new Date(a.when).toLocaleDateString()} • {d?.name}<br/><em className="text-gray-600 text-sm">{a.notes}</em></span><Link className="text-gray-900 underline" to={`/doctors/${a.doctorId}`}>Review</Link></li>
        })}</ul>
      </div>
    </div></div>)
}
