import React from 'react'
import SideBar from '../components/Sidebar/SideBar'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'

export default function Home() {
  return (
 <div className='min-h-screen min-w-screen '>
  {/* <LoadingScreen title={"Getting Portal ready"}/> */}
  <SideBar/>
 </div>
  )
}
