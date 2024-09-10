import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full flex items-center justify-center'>
        <Loader2 className='animate-spin text-neutral-400 size-8' />
    </div>
  )
}

export default Loading