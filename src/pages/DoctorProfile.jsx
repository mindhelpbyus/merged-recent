
import { useParams, useNavigate } from 'react-router-dom'
import { DOCTORS } from '../data/doctors'
import { save, load } from '../utils/storage'
import { toast } from '../utils/notifications'
export default function DoctorProfile(){
  const { id } = useParams(); const nav = useNavigate(); const d = DOCTORS.find(x=>x.id===id)
  if(!d) return <div className="max-w-3xl mx-auto px-4 py-10">Doctor not found.</div>
  const book = (slot)=>{
    const ses = load('session'); if(!ses||ses.role!=='patient'){ toast('Login as patient to book.'); return; }
    const appts = load('appointments', []); const aid = 'a'+Math.random().toString(36).slice(2,7)
    appts.push({ id:aid, doctorId:d.id, patientId:ses.id, when:slot, status:'initiated' })
    save('appointments', appts); toast('Slot selected. Continue to payment.'); nav(`/appointment/${aid}`)
  }
  return (<div className="max-w-3xl mx-auto px-4 py-10">
    <div className="bg-white border rounded-2xl p-6">
      <h2 className="text-2xl font-bold">{d.name}</h2>
      <p className="text-gray-600">{d.specialty} • {d.experience} yrs • ₹{d.price}</p>
      <p className="text-gray-600">⭐ {d.rating} • {d.location} • {d.languages.join(", ")}</p>
      <p className="mt-3 text-gray-700">{d.bio}</p>
      <h3 className="mt-6 font-semibold">Available slots</h3>
      <div className="mt-3 grid sm:grid-cols-2 gap-3">
        {d.availability.map(s=>(<button key={s} className="px-3 py-2 rounded-xl bg-white border hover:bg-gray-50" onClick={()=>book(s)}>{new Date(s).toLocaleString()}</button>))}
      </div>
    </div></div>)
}
