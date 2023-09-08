// components/Layout.tsx

import React, { useState, useEffect } from "react";
import RequisitionDataContainer from "@/components/createRequisition/RequisitionDataContainer";
import {
    AiOutlineShoppingCart,
    AiOutlineClose,
    AiOutlineInfoCircle,
    AiOutlineSearch
} from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import ProfileDropDown from "../createRequisition/ProfileDropDown";
import Link from "next/link";
import Grid from '@mui/material/Grid';
import { useSelector } from "react-redux";
import { selectRequisitionState } from '@/redux/reducers/requisitionSlice';
import Typography from '@mui/material/Typography';
import { RightPanelSection } from "./order-basket";

type DashboardLayoutProps = {
    children: React.ReactNode,
};


const Layout = ({ children }: DashboardLayoutProps) => {
    const [itemName, setItemName] = useState("");
    const requisitionState = useSelector(selectRequisitionState);

    useEffect(() => {
        if (requisitionState.itemName) {
            setItemName(requisitionState.itemName);
        }
    }, []);


    return (
        <>
            <Grid container spacing={2} className='layout-width height-100 w-[96vw] requisition-layout overflow-hidden'>
                {/* <Grid item sm={12} md={12} lg={12} className={``}>
                    <Grid container spacing={2}>
                        <Grid item sm={12} md={12} lg={9}>
                            <Typography variant="h5" className="font-bold mt-3">
                                Procurement
                            </Typography>
                        </Grid>
                        <Grid item sm={12} md={12} lg={3} className="bg-grey shadow-lg">
                            <div className="search-icon mt-3 gap-3 flex items-center">
                                <AiOutlineSearch style={{ fontSize: "25px" }} />
                                <IoMdNotificationsOutline style={{ fontSize: "25px" }} />
                                <CgMenuGridO style={{ fontSize: "25px" }} />
                                <ProfileDropDown />
                            </div>
                        </Grid>
                    </Grid>
                </Grid> */}
                <Grid item sm={9} md={9} lg={9} className={`ml-${window.innerWidth >= 1280 ? 10 : 2}  main-grid`}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5" className="font-bold mt-3">
                                Procurement
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={`ml-${window.innerWidth >= 1280 ? 5 : 2} w-full flex flex-row justify-between pr-5`}>
                                <Typography variant="h4" className="font-semibold">
                                    Create Requisition - {itemName}
                                </Typography>
                                <Link href="/createRequisition">
                                    <AiOutlineClose style={{ fontSize: "25px" }} />
                                </Link>
                            </div>
                        </Grid>
                    </Grid>
                    <main>
                        {children}
                    </main>
                </Grid>
                <Grid item sm={9} md={3} lg={3} className="bg-grey">
                    {/* <aside>
                        <RequisitionDataContainer basketValues="" vesselBasicDetails="" />
                        <div
                            className="flex flex-col mt-5 bg-white shadow-lg rounded-lg  min-w-[350px] h-[100px]"
                            style={{ borderRadius: "15px" }}
                        >
                            <div className="flex flex-row  justify-between items-center m-5">
                                <div className="flex flex-row ">
                                    <AiOutlineShoppingCart style={{ fontSize: "25px" }} />
                                    <h2 className="uppercase font-semibold ml-1">
                                        Order Basket
                                    </h2>
                                </div>
                                <p className="font-bold">$0.00</p>
                            </div>
                            <div className="flex flex-row justify-between ml-10">
                                <p className="font-semibold">0 items</p>
                                <h3 className="relative right-4 font-bold">estimated</h3>
                            </div>
                        </div>
                    </aside> */}
                       <div className="search-icon mt-3 gap-3 flex items-center">
                                <AiOutlineSearch style={{ fontSize: "25px" }} />
                                <IoMdNotificationsOutline style={{ fontSize: "25px" }} />
                                <CgMenuGridO style={{ fontSize: "25px" }} />
                                <ProfileDropDown />
                        </div>
                    <RightPanelSection></RightPanelSection>
                </Grid>
            </Grid>
        </>
    );
};
export default Layout;

// export default Layout;
