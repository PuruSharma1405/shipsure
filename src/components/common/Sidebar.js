'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
}from "react-icons/fa";
import {AiOutlinePlus,AiOutlineUser} from 'react-icons/ai'
import {RiShipFill} from 'react-icons/ri'
import {TfiAlert} from 'react-icons/tfi'
import {BsBoxSeamFill,BsDroplet,BsTools} from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'
import VShip from '../../images/VShip.png'
import Image from "next/image";
const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"",
            icon:<AiOutlinePlus style={{ fontSize: "25px" }}/>
        },
        {
            path:"/",
            name:"",
            icon:<RiShipFill/>
        },
        {
            path:"/",
            name:"",
            icon:<TfiAlert/>
        },
        {
            path:"/",
            name:"",
            icon:<AiOutlineUser/>
        },
        {
            path:"/",
            name:"",
            icon:<BsBoxSeamFill/>
        },
        {
            path:"/",
            name:"",
            icon:<BsDroplet/>
        },
        {
            path:"/",
            name:"",
            icon:<FiSettings/>
        },
        {
            path:"/",
            name:"",
            icon:<FiSettings/>
        },
        {
            path:"/",
            name:"",
            icon:<BsTools/>
        }
    ]
    
    return (
        <div className="container">
           <div className="sidebar relative">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo"></h1>
                   <div style={{marginLeft:"30px"}} className="bars">
                       <FaBars onClick={toggle} className='menu-logo'/>
                   </div>
               </div>
               <div className='left-sidebar'>
               {
                   menuItem.map((item, index)=>(
                       <Link href={item.path} key={index} className="link">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </Link>
                   ))
                  }
                                  <Image src={VShip} alt="Search" height={80} width={80} className="top-search absolute bottom-10"/>
                  </div>
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;