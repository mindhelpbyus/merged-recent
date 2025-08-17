
import { useParams, useNavigate } from 'react-router-dom'
import { load, save } from '../utils/storage'
import { DOCTORS } from '../data/doctors'
export default function Payment(){
  const { id } = useParams(); const nav = useNavigate()
  const appts = load('appointments', [])
  const appt = appts.find(a=>a.id===id)
  if(!appt) return <div className="max-w-3xl mx-auto px-4 py-10">Payment session not found.</div>
  const doc = DOCTORS.find(d=>d.id===appt.doctorId)
  const pay = ()=>{
    appt.status='paid'; save('appointments', appts)
    nav('/patient')
  }
  return (<div className="max-w-3xl mx-auto px-4 py-10">
    <div className="bg-white border rounded-2xl p-6">
      <h2 className="text-2xl font-bold">Payment</h2>
      <p className="text-gray-600">Amount: ₹{doc?doc.price:1000}</p>
      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        <input placeholder="Card Number" className="border rounded-xl p-2"/>
        <input placeholder="MM/YY" className="border rounded-xl p-2"/>
        <input placeholder="CVV" className="border rounded-xl p-2"/>
        <input placeholder="Name on Card" className="border rounded-xl p-2"/>
      </div>
      <button className="mt-2 px-4 py-2 rounded-xl bg-gray-900 text-white" onClick={pay}>Pay</button>
    </div></div>)
}
