import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
    const {workspaceId} = useParams()
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Page
