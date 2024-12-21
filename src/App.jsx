import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Sidebar from './sidebar/Sidebar'
import { Outlet } from 'react-router'
import Layout from './layout/Layout'
function App() {

  return (
    <>
    <Layout/>
      {/* <Outlet/> */}


    </>
  )
}

export default App
