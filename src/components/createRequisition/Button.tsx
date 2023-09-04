import Link from 'next/link';
import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  linkTo: string;
}

const Button: React.FC<ButtonProps> = ({ children, linkTo }) => {
  return (
    <div>
      <Link href={linkTo}>
        <div className='w-[500px] text-center rounded-full font-bold text-white bg-[#68DA6A] text-black hover:scale-95 transition-all duration-200'>
          {children}
        </div>
      </Link>
    </div>
  );
};

export default Button;
