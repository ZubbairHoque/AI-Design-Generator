import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function EmptyState() {
  return (
    <div className='flex items-center justify-center mt-10 flex-col'>
      <Image src={"/placeholder.png"}
        alt=""
        width={400} 
        height={400}
      />
      <h2 className='font-medium text-lg text-gray-500'>Create new design interior for your room.</h2>  
      <Link href={"/dashboard/Create-new"}>
        <Button className="mt-5">+ Redesign Room</Button>  
      </Link>
    </div>
  )
}

export default EmptyState