import Link from 'next/link';
import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  linkTo: string;
}

const Button: React.FC<ButtonProps> = ({ children, linkTo,vesselName }) => {
  return (
    <div>
      <Link href={`${vesselName?.length==0?'':linkTo}`}>
        <div className={`w-[500px] text-center rounded-full font-semibold bg-[#68DA6A] text-black hover:scale-95 transition-all duration-200  ${vesselName?.length>0?'cursor-pointer':'cursor-not-allowed'}`}>
          {children}
        </div>
      </Link>
    </div>
  );
};

export default Button;
