"use client";
import React, { useState } from 'react'
import { AiOutlineCaretDown,AiOutlineInfoCircle } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { BiUser,BiHelpCircle } from 'react-icons/bi'
import { BsMoon } from 'react-icons/bs';
import {IoMdSettings} from 'react-icons/io'
import {FiLogOut} from 'react-icons/fi'
import Link from 'next/link'
const ProfileDropDown = () => {
    const [open, setOpen] = useState(false)
  return (
    <button className="relative" onClick={() => setOpen(!open)}>
    <div className="flex items-center gap-x-1 shadow p-3 rounded-full ml-3">
    <BiUser style={{fontSize:'13px'}}/>
    <p>Dale Kirkwood</p>
      <AiOutlineCaretDown className="text-sm text-richblack-100" />
    </div>
    {open && (
      <div
       
        className="absolute top-[105%] right-0 z-[1000]  overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
      >
        <Link href="/dashboard/my-profile" >
          <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 profile-dropdown">
            <BsMoon className="text-lg" />
            Dark Mode
          </div>
        </Link>
        <div
          
          className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 profile-dropdown"
        >
          <AiOutlineInfoCircle className="text-lg" />
          About
        </div>
        <div
          
          className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 profile-dropdown"
        >
          <BiHelpCircle className="text-lg" />
          Help
        </div>
        <div
          
          className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 profile-dropdown"
        >
          <VscSignOut className="text-lg" />
          Actions
        </div>
        <div
          
          className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 profile-dropdown"
        >
          <IoMdSettings className="text-lg" />
          Settings
        </div>
        <div
          
          className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 profile-dropdown"
        >
          <FiLogOut className="text-lg" />
          Logout
        </div>
      </div>
)}
  </button>
  )
}

export default ProfileDropDown
