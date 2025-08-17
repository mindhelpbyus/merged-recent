
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import DoctorsList from './pages/DoctorsList'
import DoctorProfile from './pages/DoctorProfile'
import Patient from './pages/Patient'
import Doctor from './pages/Doctor'
import Appointment from './pages/Appointment'
import Payment from './pages/Payment'
import About from './pages/About'
import Terms from './pages/Terms'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation/>
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/doctors" element={<DoctorsList/>}/>
          <Route path="/doctors/:id" element={<DoctorProfile/>}/>
          <Route path="/patient" element={<Patient/>}/>
          <Route path="/doctor" element={<Doctor/>}/>
          <Route path="/appointment/:id" element={<Appointment/>}/>
          <Route path="/payment/:id" element={<Payment/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/terms" element={<Terms/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}
