import React from 'react'
import LandingPageNavbar from './_components/navbar'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
      <div className='flex flex-col py-10 px-10 xl:px-0 counter'>
        <LandingPageNavbar/>
      {children}
    </div>
  )
}

export default layout
