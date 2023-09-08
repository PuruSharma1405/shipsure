"use client";
import React, { useEffect, useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineArrowRight,
  AiOutlineShoppingCart,
  AiOutlineRight,
} from "react-icons/ai";
import { CgMenuGridO } from "react-icons/cg";
import ProfileDropDown from "../components/createRequisition/ProfileDropDown";
import { IoMdNotificationsOutline } from "react-icons/io";
import RequisitionDataContainer from "../components/createRequisition/RequisitionDataContainer";
import { useSelector } from "react-redux";
import HorizontalLinearStepper from "../components/createRequisitionSpares/Stepper";
import { selectRequisitionState } from "../redux/reducers/requisitionSlice";
import axios from "axios";
import {
  getAccountCode,
  getDepartmentList,
  getProjectsList,
  getSparePartList,
} from "@/services/operations/deliveryDetailsApi";
import { formatDate } from "@/lib/date-formatter";
import { OrderSummaryAccordion } from "@/components/summary/SummaryAccordion";
import { createRequisition } from "@/services/operations/createRequisition";
import { useAlertService } from "@/hooks/useAlertService";
import { ALERT_CONFIG } from "@/config/AlertConfig";
import { useRouter } from "next/router";
import { RightPanelSection } from "@/components/common/order-basket";



const OrderSummary = () => {

  const router = useRouter()
  const [basketValues, setBasketValues] = useState([]);
  const [vesselDetails, setVesselDetails] = useState([]);
  const requisitionState = useSelector(selectRequisitionState);
  const coyId = localStorage.getItem("coyId");
  const vesId = localStorage.getItem("vesselId");
  const vesselName = localStorage.getItem("VESSEL_NAME");
  const [sparePart, setSparePart] = useState("");
  const [accCode, setAccCode] = useState("");
  const [projectName, setProjectName] = useState("");
  const [deptName, setDeptName] = useState("");
  const [orderName, setOrderName] = useState("");
  const reqQty = 1;
  const token: string = JSON.parse(
    localStorage.getItem("token") ?? ""
  )?.access_token;
  const { showAlertMessage } = useAlertService();

  const note: string = 'notes'
  const fetchingVesselBasicDetails = async () => {
    try {
      const response = await axios.get(
        `http://192.168.201.232:3012/vessel-basic-details?VesId=${vesId}&CoyId=${coyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVesselDetails(response?.data?.result?.recordset[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = async () => {
    const equipDetails = [];
    requisitionState.itemsDetails
    for (const iterator of requisitionState.itemsDetails) {
      equipDetails.push({
          VIV_ID: iterator.VIV_ID,
          ROD_QuantityRequested: iterator.RequestQuantity,
          ROD_QuantityEnquired: iterator.RequestQuantity,
          PTR_ID: iterator.PTR_ID,
          ACC_ID: iterator.AccountCode,
        }
      )
    }

    const formData = {
      VesselId: requisitionState.vesId,
      OrdStage: "Requisition",
      AccountingCompanyId: requisitionState.coyId,
      OrderName: orderName,
      AccountId: requisitionState.accountCode,
      OrderType: requisitionState.itemName,
      OrderPriority: requisitionState.priority,
      ExpectedPortId: requisitionState?.deliveryHomePort?.value
        ? requisitionState?.deliveryHomePort.value
        : requisitionState?.deliveryOtherPort.value
          ? requisitionState?.deliveryOtherPort.value
          : requisitionState?.selectedPosition.value,
      ExpectedDeliveryDate: requisitionState.deliveryDate,
      SparePartTypeId: requisitionState.sparePartType,
      IsHazardousMaterial: requisitionState.isHazardousMaterial ? 1 : 0,
      EquipmentId:
        requisitionState.itemsDetails[0].PTR_ID,
      OrderNotes: requisitionState.note ? requisitionState.note : null,
      ProjectId: requisitionState.projects,
      DepartmentId: requisitionState.department,
      IsRequisitionAuthorised: 1,
      CertificateRequired: null,
      CatalogId: null,
      ApplicableForDryDock: requisitionState?.isRequiredDryDock ? 1 : null,
      PatIdPriorityReason: requisitionState?.urgentPriorityReason
        ? requisitionState?.urgentPriorityReason
        : requisitionState?.fastTrackPriorityReason
          ? requisitionState?.fastTrackPriorityReason
          : null,
      PriorityJustification: requisitionState.justification,
      ClaimsId: requisitionState.insuranceClaim,
      CrewRankId: requisitionState.rank,
      General1Id: requisitionState.general1,
      General3Id: requisitionState.general2,
      NationalityId: requisitionState.nationality,
      SeasonalId: requisitionState.seasonal,
      OrdAuxvessel: requisitionState.vesselAux,
      CatalogueSource: null,
      CatalogueSourceId: null,
      OrderLinesXML: [
        {
          VIV_ID: "FQUE00002110",
          ROD_QuantityRequested: reqQty,
          ROD_QuantityEnquired: reqQty,
          PTR_ID: "FRCC00000099",
          ACC_ID: requisitionState.accountCode,
        },
      ],
    };
    console.log(formData)

    try {
      const response = await createRequisition(token, formData);
      console.log(response?.result?.recordset)
      if (response?.result?.recordset) {
        showAlertMessage(`Success
        Requisition created successfully. A new
        requisition ${response?.result?.recordset[0].CoyId}-${response?.result?.recordset[0].OrdOrderNo} has been created
        `, ALERT_CONFIG.SUCCESS);
        router.push('/createRequisition')
      }
    } catch (error: any) {
      console.log(error)
      showAlertMessage(error.message, ALERT_CONFIG.ERROR)
    }
  };

  useEffect(() => {
    fetchingVesselBasicDetails();
    fetchData();
  }, []);

  console.log(requisitionState)

  async function fetchData() {
    const sparePartListRes = await getSparePartList(token, {});
    const { recordset } = sparePartListRes.result;
    if (recordset) {
      const sparePartName = recordset.filter(
        (item: any) => requisitionState.sparePartType === item.SptId
      );
      setSparePart(`${sparePartName[0].SptCode} - ${sparePartName[0].SptName}`);
    }

    const accountCodeRes = await getAccountCode(token, {
      // ChdPo: 1,
      VesId: requisitionState.vesId,
      CoyId: requisitionState.coyId,
    });
    const accountCodeResult = accountCodeRes.result;
    if (accountCodeResult.recordset) {
      {
        const accObj = accountCodeResult?.recordset?.filter(
          (item: any) => requisitionState.accountCode === item.AccId
        );
        setAccCode(`${accObj[0]?.AccId} - ${accObj[0]?.ChdDesc}`);
        setOrderName(accObj[0]?.ChdDesc);
      }
    }

    const projects = await getProjectsList(token, {
      VesId: requisitionState.vesId,
    });
    const projectsResult = projects.result;
    if (projectsResult.recordset) {
      const projectsObj = projectsResult?.recordset.filter(
        (item: any) => requisitionState.projects === item.PrjId
      );
      setProjectName(projectsObj[0]?.PrjDesc);
    }

    const departListRes = await getDepartmentList(token, {});
    const departListResult = departListRes.result;
    if (departListResult.recordset) {
      const deptObj = departListResult.recordset.filter(
        (item: any) => requisitionState.department === item.DepId
      );
      setDeptName(deptObj[0]?.DepName);
    }
  }

  return (
    <div className="h-[100vh]  relative w-[100vw] bg-[#FFFFFF] overflow-x-hidden overflow-y-auto">
      <div className="mx-auto">
        <div className="flex justify-between w-11/12 items-center mx-auto">
          <div className="text-2xl font-bold mt-3">
            <h2>Procurement</h2>
          </div>
          <div className="search-icon mt-3 gap-3 flex items-center">
            <AiOutlineSearch style={{ fontSize: "25px" }} />
            <IoMdNotificationsOutline style={{ fontSize: "25px" }} />
            <CgMenuGridO style={{ fontSize: "25px" }} />
            <ProfileDropDown />
          </div>
        </div>
        <div className="h-full w-full flex flex-row">
          <div className=" w-8/12 mt-7 ml-36 relative">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-semibold">
                Create Requisition-{requisitionState?.itemName}
              </h1>
              <AiOutlineClose style={{ fontSize: "25px" }} />
            </div>
            <HorizontalLinearStepper />
            <div
              className="bg-[#F2EEEB] pl-20 pt-5 pb-16 mt-10 mb-20"
              style={{ borderRadius: "20px" }}
            >
              <div className="flex flex-col mt-5">
                <p className="ml-2" style={{ fontWeight: "600" }}>
                  Order Details
                </p>
              </div>
              <div className="flex flex-col mt-5">
                <p
                  className="ml-2"
                  style={{ color: "#04487F", fontWeight: "500" }}
                >
                  {vesselName}
                </p>
              </div>
              <div className="flex flex-row justify-left w-full relative">
                <div className="flex flex-col mt-5">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Account Code
                  </p>
                  <div className="flex flex-row items-center">
                    <p className="ml-2">{accCode}</p>
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
                <div className="flex flex-col mt-5">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Project
                  </p>
                  <div className="flex flex-row ">
                    <p className="ml-2">{projectName}</p>
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
                <div className="flex flex-col mt-5">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Spare Part Type
                  </p>
                  <div className="flex flex-row ">
                    <p className="ml-2">{sparePart}</p>
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
                <div className="flex flex-col mt-5">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Priority
                  </p>
                  <div className="flex flex-row ">
                    <p className="ml-2">{requisitionState?.priority}</p>
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
              </div>

              {
                (requisitionState.vesselAux !== null) && (
                  <div className="flex flex-row justify-left w-full relative">
                    <div className="flex flex-col mt-5">
                      <p style={{ color: "#697E85" }} className="ml-2">
                        Insurance Claim
                      </p>
                      <div className="flex flex-row items-center">
                        <p className="ml-2">{requisitionState.insuranceClaim}</p>
                      </div>
                      <div className="w-[310px] mt-2"></div>
                    </div>
                    <div className="flex flex-col mt-5">
                      <p style={{ color: "#697E85" }} className="ml-2">
                        Crew Rank
                      </p>
                      <div className="flex flex-row ">
                        <p className="ml-2">{requisitionState?.rank}</p>
                      </div>
                      <div className="w-[310px] mt-2"></div>
                    </div>
                    <div className="flex flex-col mt-5">
                      <p style={{ color: "#697E85" }} className="ml-2">
                        Vessel Aux
                      </p>
                      <div className="flex flex-row ">
                        <p className="ml-2">{requisitionState?.vesselAux}</p>
                      </div>
                      <div className="w-[310px] mt-2"></div>
                    </div>
                    <div className="flex flex-col mt-5">
                      <p style={{ color: "#697E85" }} className="ml-2">
                        Seasonal
                      </p>
                      <div className="flex flex-row ">
                        <p className="ml-2">{requisitionState?.seasonal}</p>
                      </div>
                      <div className="w-[310px] mt-2"></div>
                    </div>
                  </div>

                )
              }

              {
                requisitionState?.priority === "urgent" || requisitionState?.priority === "fasttrack" &&
                (
                  <div className="flex flex-row justify-left w-full mt-1 relative">
                    <div className="flex flex-col mt-5">
                      <p style={{ color: "#697E85" }} className="ml-2">
                        Priority Reason
                      </p>
                      <div className="flex flex-row items-center">
                        <p className="ml-2">{requisitionState?.urgentPriorityReason ? requisitionState?.urgentPriorityReason : requisitionState?.fastTrackPriorityReason}</p>
                      </div>
                      <div className="w-[310px] mt-2"></div>
                    </div>
                    <div className="flex flex-col mt-5">
                      <p style={{ color: "#697E85" }} className="ml-2">
                        Justification
                      </p>
                      <div className="flex flex-row ">
                        <p className="ml-2">
                          {requisitionState?.justification ? requisitionState?.justification : '-'}
                        </p>
                      </div>
                      <div className="w-[310px] mt-2"></div>
                    </div>
                  </div>
                )
              }

              <div className="flex flex-row justify-left w-full mt-1 relative">
                <div className="flex flex-col mt-5">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Department
                  </p>
                  <div className="flex flex-row items-center">
                    <p className="ml-2">{deptName ? deptName : "-"}</p>
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
                <div className="flex flex-col mt-5">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Hazaourdous Material Requested
                  </p>
                  <div className="flex flex-row ">
                    <p className="ml-2">
                      {requisitionState?.isHazardousMaterial ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
                <div className="flex flex-col mt-5">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Required For Dry Dock
                  </p>
                  <div className="flex flex-row ">
                    <p className="ml-2">
                      {requisitionState?.isRequiredDryDock ? "Yes" : "No"}
                    </p>
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
              </div>
              <div className="w-[310px] mt-2"></div>
              <div className="w-[310px] mt-2"></div>
              <div className="flex flex-col mt-5">
                <p className="ml-2" style={{ fontWeight: "600" }}>
                  Delivery Details
                </p>
              </div>

              <div className="flex flex-row justify-left w-full mt-1 relative">
                <div className="flex flex-col mt-5">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Requested Delivery Date
                  </p>
                  <div className="flex flex-row items-center">
                    <p className="ml-2">
                      {requisitionState.deliveryDate
                        ? formatDate(requisitionState.deliveryDate)
                        : ""}
                    </p>
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
                <div className="flex flex-col mt-5">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Requested Delivery Port
                  </p>
                  <div className="flex flex-row ">
                    <p className="ml-2">
                      {requisitionState?.deliveryHomePort?.label
                        ? requisitionState?.deliveryHomePort.label
                        : requisitionState?.deliveryOtherPort.label
                          ? requisitionState?.deliveryOtherPort.label
                          : requisitionState?.selectedPosition.label}
                    </p>
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
              </div>
              <div className="mt-9">
                <div className="flex flex-col mt-5 mr-20">
                  <p style={{ color: "#697E85" }} className="ml-2">
                    Notes
                  </p>
                  <div className="flex flex-row items-center">
                    <textarea
                      placeholder=""
                      className="bg-transparent h-32 w-full  border border-black focus:outline-none"
                      value={
                        requisitionState?.note ? requisitionState.note : note
                      }
                      disabled
                    />
                  </div>
                  <div className="w-[310px] mt-2"></div>
                </div>
              </div>
            </div>
            <OrderSummaryAccordion />
            <div
              onClick={handleClick}
              className="flex flex-row uppercase justify-center items-center p-2 w-[106px] text-center rounded-full font-bold text-white bg-[#11110E] absolute -bottom-14 right-0 hover:scale-95 transition-all duration-200"
            >
              <p className="text-[14px]">Finish</p>
              <AiOutlineArrowRight className="ml-1" />
            </div>
          </div>
          <RightPanelSection></RightPanelSection>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
