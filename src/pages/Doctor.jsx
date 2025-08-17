
import { Link } from 'react-router-dom'
import { load, save } from '../utils/storage'
import { DOCTORS } from '../data/doctors'
export default function Doctor(){
  const ses = load('session'); const my = DOCTORS.find(d=>d.id===ses?.id) || DOCTORS[0]
  const appts = load('appointments', []).filter(a=>a.doctorId===my.id)
  const scheduleWithPrev = ()=>{
    const prev = appts.find(a=>a.status==='completed'); if(!prev) return;
    const aid = 'a'+Math.random().toString(36).slice(2,7)
    const next = { id:aid, doctorId:my.id, patientId:prev.patientId, when:new Date(Date.now()+72*3600*1000).toISOString(), status:'scheduled' }
    const all = load('appointments', []); all.push(next); save('appointments', all)
  }
  return (<div className="max-w-7xl mx-auto px-4 py-10">
    <h2 className="text-2xl font-bold">Doctor Dashboard</h2>
    <div className="mt-6 grid md:grid-cols-2 gap-4">
      <div className="bg-white border rounded-2xl p-6">
        <h3 className="font-semibold">My Profile</h3>
        <p className="text-gray-600 mt-2">{my.name} • {my.specialty} • {my.experience} yrs</p>
        <button className="mt-3 px-3 py-1.5 rounded-xl bg-white border">Update Profile</button>
      </div>
      <div className="bg-white border rounded-2xl p-6">
        <h3 className="font-semibold">Appointments</h3>
        <ul className="mt-3 space-y-2">{appts.map(a=>(
          <li key={a.id} className="flex items-center justify-between">
            <span>{new Date(a.when).toLocaleString()} • {a.status}</span>
            <Link className="text-gray-900 underline" to={`/appointment/${a.id}`}>Open</Link>
          </li>
        ))}</ul>
        <button onClick={scheduleWithPrev} className="mt-4 px-3 py-1.5 rounded-xl bg-gray-900 text-white">Schedule With Previous Patient</button>
      </div>
    </div></div>)
}
