import React from 'react'
import Navbar from '@/Components/Navbar';
const UserLayout = ({children}) => {
  return (
    <>
    <Navbar/>
    {children}
    </>
  )
}

export default UserLayout