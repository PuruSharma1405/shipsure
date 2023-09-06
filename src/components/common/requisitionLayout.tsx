// components/Layout.tsx

import React from 'react';
import RequisitionDataContainer from "@/components/createRequisition/RequisitionDataContainer";
import {
    AiOutlineShoppingCart,
} from "react-icons/ai";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
type DashboardLayoutProps = {
    children: React.ReactNode,
};


const Layout = ({ children }: DashboardLayoutProps) => {
    return (
        <>
            <Grid container spacing={2} className='width-97 height-100 '>
                <Grid item sm={9} md={9} lg={9} className='main-grid'>
                    <main>
                        {children}
                    </main>
                </Grid>
                <Grid item sm={9} md={3} lg={3} className="bg-grey">
                    <aside>
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
                    </aside>
                </Grid>
            </Grid>
        </>
    );
};
export default Layout;

// export default Layout;
