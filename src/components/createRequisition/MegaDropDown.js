import React, { useState, useEffect, useRef } from 'react';
import './MegaDropDown.css';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import axios from 'axios';
import { setCoyId, setVesId } from "../../redux/reducers/requisitionSlice";
import { useDispatch } from 'react-redux';
import Image from "next/image";
import RequisitionBasket from '../../images/RequisitionBasket.png';
import RequisitionSpares from "../../images/RequisitionSpares.png";
import ToolTip from "../createRequisition/ToolTip"
const MegaDropDown = ({
  showDropdown,
  setShowDropdown,
  vesselName,
  fetchingDropDownData,
}) => {
  const [megaMenu, setMegaMenu] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loadMore, setLoadMore] = useState(true);
  const[showToolTip,setShowToolTip]=useState(false)
  const ref = useRef(null);
  const dispatch = useDispatch()
  const token = JSON.parse(localStorage.getItem('token'))?.access_token;

  const megaDropDownKeys = {
    AccountingCompanyId: 'COY ID',
    VesselName: 'VESSEL NAME',
    ManagementStartDate: 'MGMT START',
    ManagementEndDate: 'MGMT END',
    VesselManagementPurchasingDateStart: 'PUR START',
    VesselManagementPurchasingDateEnd: 'PUR END',
  };

  const clickHandler = (currData) => {
    console.log('currData', currData);
    fetchingDropDownData(currData['VesselName']);
  };

  useOnClickOutside(ref, () => setShowDropdown(false));

  const filteredDropDown = () => {
    const filteredData = megaMenu.filter((currData) => {
      if (currData['VesselName']) {
        return currData['VesselName'].toLowerCase().includes(vesselName.toLowerCase());
      }
      return false;
    });
    setMegaMenu(filteredData.slice(0, startIndex + 10));
    if (filteredData.length <= startIndex + 10) {
      setLoadMore(false);
    } else {
      setLoadMore(true);
    }
  };

  useEffect(() => {
    filteredDropDown();
  }, [vesselName, startIndex]);

  const handleScroll = (e) => {
    console.log('runned');
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      if (loadMore) {
        console.log('scrolled', loadMore);
        setStartIndex((prevIndex) => prevIndex + 10);
      }
    }
  };

  useEffect(() => {
    const dropDownData = [];
    setMegaMenu(dropDownData.slice(0, 10));
  }, []);

  const fetchingMegaDropDown = async () => {
    try {
      const response = await axios.get(
        `http://192.168.201.232:3012/management-vessel-lookup?SearchText=${vesselName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMegaMenu(response?.data?.result?.recordset);
      dispatch(setCoyId(response?.data?.result?.recordset[0]?.AccountingCompanyId))
      dispatch(setVesId(response?.data?.result?.recordset[0]?.VesselId))
      localStorage.setItem('vesselId', response?.data?.result?.recordset[0]?.VesselId)
      localStorage.setItem('coyId', response?.data?.result?.recordset[0]?.AccountingCompanyId)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchingMegaDropDown();
  }, [vesselName, token]); 

  return (
    megaMenu?.length > 0 && (
      <div className="mega-dropdown" ref={ref}>
        {showDropdown && (
          <div className="mega-dropdown-content left-[50%] translate-x-[-50%]" onScroll={handleScroll}>
            <div className="row">
              <div className="column">
                <ul>
                  {megaMenu.map((currData, index) => (
                    <li key={index} onClick={() => clickHandler(currData)} className='each-column'>
                      <div className='coyId'>
                        {currData['AccountingCompanyId']}
                      </div>
                      <div className="megamenu-vesselname">
                        {currData['VesselName']}
                      </div>
                      <div className='relative'>
                          <Image src={RequisitionBasket} alt="Search" height={35} width={35} className='requisitionBasket' onMouseEnter={() => setShowToolTip(true)} onMouseLeave={() => setShowToolTip(false)}/>
                      </div>
                      <div>
                        <Image src={RequisitionSpares} alt="Search" height={20} width={20} className='requisitionTool'/>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  )
};

export default MegaDropDown;
