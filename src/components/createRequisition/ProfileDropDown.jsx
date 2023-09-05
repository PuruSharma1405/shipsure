"use client";
import React, {  useState,useRef, useEffect } from 'react'
import { AiOutlineCaretDown,AiOutlineInfoCircle } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { BiUser,BiHelpCircle } from 'react-icons/bi'
import { BsMoon } from 'react-icons/bs';
import {IoMdSettings} from 'react-icons/io'
import {FiLogOut} from 'react-icons/fi'
import Link from 'next/link'
import useOnClickOutside from "../../hooks/useOnClickOutside"
import { selectAuthState } from "@/redux/reducers/user";
import { useSelector } from "react-redux";
import AuthService from '@/services/authService';

const ProfileDropDown= () => {
  const authService = new AuthService();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const [name, setName] = useState('');
  const authState = useSelector(selectAuthState);
  useOnClickOutside(ref, () => setOpen(false));
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    if(authState.isAuthenticated && authState.name) {
      setName(authState.name || '')
    }
  }

  const logOut = () => {
    authService.logout();
  }

  return (
    <button className="relative" onClick={() => setOpen(!open)}>
      <div className="flex items-center gap-x-1 shadow p-2 rounded-full ml-3">
        <BiUser style={{ fontSize: '13px' }} />
        <p>{name || 'Dale Kirkwood'}</p>
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          className="absolute top-[105%] right-0 z-[1000] overflow-hidden rounded-md border-[1px] border-richblack-700 bg-white"
          ref={ref}
        >
          <Link href="/dashboard/my-profile">
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
           onClick={() => {logOut()}}
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
