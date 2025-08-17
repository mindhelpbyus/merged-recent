
import { useParams, useNavigate } from 'react-router-dom'
import { load, save } from '../utils/storage'
export default function Appointment(){
  const { id } = useParams(); const nav = useNavigate()
  const appts = load('appointments', [])
  const appt = appts.find(a=>a.id===id)
  if(!appt) return <div className="max-w-3xl mx-auto px-4 py-10">Appointment not found.</div>
  const goPay = ()=>{ appt.status='payment_pending'; save('appointments', appts); nav(`/payment/${appt.id}`) }
  return (<div className="max-w-3xl mx-auto px-4 py-10">
    <div className="bg-white border rounded-2xl p-6">
      <h2 className="text-2xl font-bold">Confirm Appointment</h2>
      <p className="text-gray-600">When: {new Date(appt.when).toLocaleString()}</p>
      <button className="mt-4 px-4 py-2 rounded-xl bg-gray-900 text-white" onClick={goPay}>Proceed to Payment</button>
    </div></div>)
}
