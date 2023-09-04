import React, { useState, useEffect, useRef } from 'react';
import './MegaDropDown.css';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import axios from 'axios';
import { setCoyId,setVesId } from "../../redux/reducers/requisitionSlice";
import { useDispatch } from 'react-redux';

const MegaDropDown = ({
  showDropdown,
  setShowDropdown,
  vesselName,
  fetchingDropDownData,
}) => {
  const [megaMenu, setMegaMenu] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loadMore, setLoadMore] = useState(true);
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
      localStorage.setItem('vesselId',response?.data?.result?.recordset[0]?.VesselId)
      localStorage.setItem('coyId',response?.data?.result?.recordset[0]?.AccountingCompanyId)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchingMegaDropDown();
  }, [vesselName, token]);

  const formatDate = (dateString) => {
    if (dateString) {
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
    }
    return '-';
  };

  return (
    megaMenu?.length > 0 && (
      <div className="mega-dropdown" ref={ref}>
        {showDropdown && (
          <div className="mega-dropdown-content" onScroll={handleScroll}>
            <div className="row">
              {Object.keys(megaDropDownKeys).map((backendKey) => (
                <div className="column" key={backendKey}>
                  <h2>{megaDropDownKeys[backendKey]}</h2>
                  <ul>
                    {megaMenu.map((currData, index) => (
                      <li
                        key={index}
                        className={`${currData['VesselName'] ? 'megamenu-vesselname' : ''}`}
                        onClick={() => clickHandler(currData)}
                      >
                        {backendKey.startsWith('Management') || backendKey.startsWith('VesselManagement')
                          ? formatDate(currData[backendKey])
                          : currData[backendKey]}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default MegaDropDown;
