import React from 'react'
import MapComponent from '@/pages/components/Map'

function Location() {
  return (
    <div className='h-screen w-full overflow-hidden font-main relative'>
    <div className='h-full w-full absolute z-1'>
         <MapComponent />
    </div>
    <div id='index-element' className='absolute z-3 h-full w-full flex items-end text-white'>

        <div className='w-full h-[30%] p-5 bg-white text-black'>
            <div className='flex gap-3'>
            <h3 className='font-bold'>Create Geofence</h3>
            <button className='bg-[#fbd0ff] text-sm text-[#4642f0] px-3 rounded-lg'>
                Coming soon
            </button>
            </div>

            <p className='mt-2'>Location based Mints allow you to mint to to users when they are in a particular Location</p>
        
        </div>
        
    </div>
    </div>
  )
}

export default Location