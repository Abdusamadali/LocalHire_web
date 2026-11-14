import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { SignUp,Login } from './pages'
import ManageJobs from './components/employer/ManageJobs'
import Applicants from './components/employer/Applications'
import JobDiscovery from './components/employee/JobDiscovery'
import MyApplications from './components/employee/MyApplication'
import EmployeeAccount from './components/employee/EmployeeProfile'


function App() {
 
  return (
  //  <Login/>
  // <SignUp/>
  // <ManageJobs/>
  // <Applicants/>
  // <JobDiscovery/>
  // <MyApplications/>
  <EmployeeAccount/>
  )
}

export default App
