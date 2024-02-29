import { DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useRouter } from 'next/router'
import React from 'react'

function Consumer() {
  const { isAuthenticated } = useDynamicContext()

  const router = useRouter()
  
  if(isAuthenticated){
    router.push('https://3000-ozodimgba-myntapp-4979bymbxy4.ws-eu108.gitpod.io/User')
  }
  return (
    <div className='h-screen w-screen font-main flex flex-col justify-center items-center bg-white'>
        <h3 className='my-3'>Click the button to login in</h3>
        <DynamicWidget />
    </div>
  )
}

export default Consumer