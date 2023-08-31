import Link from 'next/link'
import React from 'react'

const Button = ({children,linkTo}) => {
  return (
    <div>
      <Link href={linkTo}>
        <div className='w-[500px] text-center rounded-full font-bold text-white bg-[#11110E] hover:scale-95 transition-all duration-200'>
            {children}
        </div>
      </Link>
    </div>
  )
}

export default Button
