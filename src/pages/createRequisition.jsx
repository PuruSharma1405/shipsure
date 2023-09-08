"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsBoxSeamFill } from "react-icons/bs";
import { MdOutlineDirectionsBoat } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";
import CTAButton from "../components/createRequisition/Button";
import ProfileDropDown from "../components/createRequisition/ProfileDropDown";
import { IoMdNotificationsOutline } from "react-icons/io";
import MegaDropDown from "../components/createRequisition/MegaDropDown";
import SuggestedRequisitions from "../components/createRequisition/SuggestedRequisitions";
import { selectAuthState } from "@/redux/reducers/user";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { getVesselPart } from "../services/operations/createVesselAPI";
import { useDispatch } from "react-redux";
import AuthService from "@/services/authService";
import { setItemName, setItemsDetails, setVesselDetails } from "../redux/reducers/requisitionSlice";
import axios from "axios";
import Image from "next/image";
import VesselImage from "../images/VesselImage.png";
import IconButton from "@mui/material/IconButton";
import Search from "../images/Search.png";
import './createRequisition.css'
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  InputBase,
} from "@mui/material";
import Grid from "@mui/material/Grid";
const CreateRequisition = () => {
  const [item, setItem] = useState("");
  const router = useRouter();
  const [vesselName, setVesselName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const authState = useSelector(selectAuthState);
  const [radioItems, setRadioItems] = useState();
  const dispatch = useDispatch();
  const authService = new AuthService();
  const token = JSON.parse(localStorage.getItem("token"))?.access_token;

  const userData = authService.getUser();
  const itemChange = async (e) => {
    console.log("userData", userData);
    setItem(e.target.value);
    getVesselPart(e.target.value, token);
    dispatch(setItemName(e.target.value));
    localStorage.setItem("itemName", e.target.value);
  };

  useEffect(() => {
    if (!authState.isAuthenticated) {
      router.push("/");
    }
    dispatch(setVesselDetails([]))
    dispatch(setItemsDetails([]))
  }, []);

  const changeHandler = (e) => {
    setVesselName(e.target.value.toLowerCase());
    setShowDropdown(true);
  };

  const fetchingDropDownData = (vesselName) => {
    setVesselName(vesselName);
    setShowDropdown(false);
  };

  const fetchingItems = async () => {
    try {
      const response = await axios.get(
        "http://192.168.201.232:3012/purch-attribute-lookup-code?LookupCode=VesselRequisitionOrderType",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRadioItems(response?.data?.result?.recordset);
      const firstItem = response?.data?.result?.recordset
        ? response?.data?.result?.recordset[0].PatName
        : "";

      setItem(firstItem);
      localStorage.setItem("itemName", firstItem);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchingItems();
  }, []);

  return (
    <>
      {authState.isAuthenticated ? (
        <div className="h-[100vh]  relative w-[100vw] bg-[#F5F5F5] overflow-x-hidden  create-requisition">
          <div className="mx-auto">
            <div className="flex justify-between w-11/12 items-center mx-auto">
              <Typography variant="h6" component="div">
                Procurement
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <div className="search-icon mt-3 gap-3 flex items-center relative right-10">
                  <Image
                    src={Search}
                    alt="Search"
                    height={24}
                    width={24}
                    className="top-search"
                  />
                  <IconButton color="inherit">
                    <IoMdNotificationsOutline style={{ fontSize: "25px" }} />
                  </IconButton>
                  <IconButton color="inherit">
                    <CgMenuGridO style={{ fontSize: "25px" }} />
                  </IconButton>
                  <ProfileDropDown />
                </div>
              </Box>
            </div>

            <div
              className="h-[100vh] flex flex-col  justify-center items-center"
              relative
            >
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: "57vh", zIndex: 999, marginTop: "10px" }}
              >
                <div
                  className="w-10/12 h-[500px] relative"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={VesselImage}
                    alt="vesselImage"
                    className="vesselImage w-full"
                    style={{
                      position: "absolute",
                      bottom: "15px",
                      zIndex: -10,
                      borderRadius: "20px",
                      height: "500px",
                      maxWidth: "100%",
                    }}
                  />
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>
                      <BsBoxSeamFill
                        style={{ fontSize: "25px", color: "white" }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h6"
                        sx={{
                          textTransform: "uppercase",
                          fontSize:'16px',
                          color: "white",
                        }}
                        className="custom-font create-requisition"
                      >
                        Create Requisition
                      </Typography>
                    </Grid>
                  </Grid>
                  <Paper className="w-[500px] h-[180px] flex flex-col mt-[35px] mb-4 shadow justify-center"
                   sx={{"@media (max-width: 600px)": {
                    height: "270px",
                  },
                  "@media (max-width: 480px)": {
                    width: "300px",
                  }, }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        backgroundColor: "#EBE8DF",
                        borderRadius: "50px",
                        border: "1px solid #ccc",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px",
                        margin: "0 auto",
                        width: "430px",
                        maxWidth: "500px",
                        marginTop: "20px",
                        "@media (max-width: 768px)": {
                          width: "80%",
                        },
                        "@media (max-width: 480px)": {
                          width: "70%",
                        },
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <MdOutlineDirectionsBoat
                          color="#697E85"
                          style={{ fontSize: "25px",marginLeft:"10px",marginRight: "10px" }}
                        />
                        <InputBase
                          type="text"
                          placeholder="Search Vessel"
                          fullWidth
                          required
                          sx={{
                            "& input": {
                              border: "none",
                              outline: "none",
                              backgroundColor: "transparent",
                              marginLeft: "10px",
                            },
                          }}
                          value={vesselName}
                          onChange={changeHandler}
                        />
                      </div>
                      <IconButton color="#71858A">
                        <AiOutlineSearch style={{ fontSize: "25px" }} />
                      </IconButton>
                    </Paper>
                    {vesselName?.length > 0 && (
                      <MegaDropDown
                        showDropdown={showDropdown}
                        setShowDropdown={setShowDropdown}
                        vesselName={vesselName}
                        fetchingDropDownData={fetchingDropDownData}
                      />
                    )}
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <div className="relative bottom-3 requisition-radio-items">
                        {radioItems?.map((currData, index) => (
                          <FormControlLabel
                            key={index}
                            value={currData?.PatName}
                            control={
                              <Radio
                                checked={item === currData?.PatName}
                                onChange={itemChange}
                              />
                            }
                            label={currData?.PatName}
                          />
                        ))}
                      </div>
                    </RadioGroup>
                  </Paper>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: "10px",
                    }}
                  >
                    <CTAButton
                      linkTo={"/createRequisitionItems"}
                      vesselName={vesselName}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          width: "100%",
                          justifyContent: "center",
                          padding: "10px",
                        }}
                      >
                        <AiOutlinePlus style={{fontSize:'20px'}}/>
                        <Typography
                          variant="body1"
                          className="custom-font"
                          sx={{ textTransform: "uppercase",marginLeft:'10px' }}
                        >
                          <span className="cta-button-size">Create</span>
                        </Typography>
                      </div>
                    </CTAButton>
                  </div>
                </div>
              </Grid>
              <Grid
                container
                rowSpacing={1}
                style={{ minHeight: "43vh"}}
              >
                <SuggestedRequisitions />
              </Grid>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CreateRequisition;
