"use client"
import { AiOutlineDown, AiOutlineRight, AiOutlineShoppingCart } from "react-icons/ai";
import RequisitionDataContainer from "../createRequisition/RequisitionDataContainer";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectRequisitionState } from "@/redux/reducers/requisitionSlice";

export const RightPanelSection = () => {
    const requisitionState = useSelector(selectRequisitionState)
    const [expandSectionIndex, setExpandSectionIndex] = useState(null);

    const showHideSection = (index: any) => {
        if (expandSectionIndex === index) {
            setExpandSectionIndex(null)
        } else {
            setExpandSectionIndex(index);
        }
    };

    const getTotalCost = (values: any = []) => {
        let total = 0;

        for (const value of values) {
            for (const part of value.SpareParts) {
                total += (part.RequestQuantity ? part.RequestQuantity : 0) * part.EstimatePrice;
            }
        }
        return total ? total.toFixed(2) : 0;
    }


    return (
        <div className="w-4/12 bg-[#E8ECED] ml-[50px] h-[100vh]">
            <div className="flex flex-row flex-wrap mt-[60px] ml-[50px]">
                <RequisitionDataContainer
                    height="320px"
                    width="370px"
                    title="Seaways Athens-9597109"
                    heading="Financials"
                    desc1="Budget:Actual YTD"
                    desc1Value="1.95M-2.34M"
                    desc2="Accrual"
                    desc2Value="-39.46%"
                    desc3="Variance"
                    desc3Value="386.1K"
                    basketValues={requisitionState?.itemsDetails}
                    vesselBasicDetails={requisitionState?.vesselDetails}
                />
                <div
                    className="flex flex-col mt-5 bg-white shadow-lg rounded-lg  w-[350px] max-h-fit"
                    style={{ borderRadius: "15px" }}
                >
                    <div className="flex flex-row  justify-between items-center m-5">
                        <div className="flex flex-row ">
                            <AiOutlineShoppingCart style={{ fontSize: "25px" }} />
                            <h2 className="uppercase font-semibold ml-1">
                                Order Basket
                            </h2>
                        </div>
                        <p className="font-bold">$ {getTotalCost(requisitionState?.itemsDetails)}</p>
                    </div>
                    <div className="flex flex-row justify-between ml-10">
                        <p className="font-semibold">{requisitionState?.itemsDetails?.length} item</p>
                        <h3 className="relative right-4 font-bold">estimated</h3>
                    </div>
                    <div
                        className="h-[10px]"
                        style={{
                            borderBottom: "1px solid #CDD6DB",
                            width: "80%",
                            margin: "0 auto",
                        }}
                    ></div>
                    {requisitionState?.itemsDetails?.map((value: any, index: any) =>

                        <div>

                            <div className="flex flex-row  justify-between items-center m-5">

                                <div className="flex flex-row ">

                                    {expandSectionIndex === index ? (

                                        <AiOutlineDown

                                            style={{ fontSize: "25px", color: "green" }}

                                            onClick={() => showHideSection(index)}

                                        />

                                    ) : (

                                        <AiOutlineRight

                                            style={{ fontSize: "25px", color: "green" }}

                                            onClick={() => showHideSection(index)}

                                        />

                                    )}

                                    <h2 className="uppercase font-semibold ml-1 text-green-600">

                                        {value?.VIV_NAME ||

                                            ""}

                                    </h2>

                                </div>

                                <p className="font-bold">{value?.SpareParts?.length} item</p>

                            </div>

                            <div className="flex flex-row justify-around ml-3">

                                <p>{value?.Maker && <p>Maker</p>}</p>

                                <p>

                                    {value?.Maker ||

                                        ""}

                                </p>

                            </div>

                            <div className="flex flex-row justify-around mt-3 relative left-2">

                                <p>{value?.SerialNumber && <p>SerialNo</p>}</p>

                                <p>

                                    {value?.SerialNumber ||

                                        ""}

                                </p>

                            </div>
                            <div className="flex flex-row justify-around mt-3 relative left-2">

                                <p>{value?.Type && <p>Type</p>}</p>

                                <p>

                                    {value?.Type ||

                                        ""}

                                </p>

                            </div>

                            {expandSectionIndex === index &&

                                value?.SpareParts?.map((currData: any, index: any) => {

                                    console.log('currDataa', currData);

                                    return (

                                        <div key={index} className="flex flex-col" style={{ borderBottom: '1px solid grey' }}>

                                            <div className="flex flex-row  justify-between items-center m-5 relative left-3">

                                                <div className="flex flex-row ">

                                                    <h2 className="uppercase font-semibold" style={{ width: '70%' }}>

                                                        {currData?.VIV_NAME}

                                                    </h2>

                                                </div>

                                                <p className="font-bold relative right-16">{(currData?.RequestQuantity ? currData?.RequestQuantity : 0) + ' pcs'} </p>

                                            </div>

                                            <div>

                                                <div className="flex flex-row justify-around">

                                                    <p>Maker&apos;s Ref</p>

                                                    <p>Drawing Pos</p>

                                                </div>

                                                <div className="flex flex-row justify-around mt-5 font-semibold items-center relative right-5">

                                                    <p className="relative mb-1 left-3">{currData?.VIV_MakersRef}</p>

                                                    <p>{currData?.VIV_DrawingPos ? currData?.VIV_DrawingPos : '-'}</p>

                                                </div>

                                            </div>

                                        </div>

                                    );

                                })}

                        </div>

                    )}
                </div>
            </div>
        </div>
    )
}