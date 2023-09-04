import React, { useState, useEffect, useRef } from "react";
import "./DropDown.css";
import useOnClickOutside from '../../hooks/useOnClickOutside';

const initialLoadCount = 10;
const loadMoreThreshold = 200;

const DropDown = ({ fetchingItem, showDropDown, setShowDropdown, componentName, searchComponent, setSearchComponent }) => {
  const [displayedComponents, setDisplayedComponents] = useState([]);

  const ref = useRef(null);

  const filterComponents = () => {
    const filteredData = searchComponent?.filter((currData) => {
      return currData.ComponentName.toLowerCase().includes(componentName.toLowerCase());
    });
    setDisplayedComponents(filteredData?.slice(0, initialLoadCount));
  };

  useEffect(() => {
    filterComponents();
  }, [componentName, searchComponent]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - loadMoreThreshold
      ) {
        const nextBatch = searchComponent.slice(
          displayedComponents.length,
          displayedComponents.length + initialLoadCount
        );
        setDisplayedComponents((prev) => [...prev, ...nextBatch]);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [displayedComponents, searchComponent]);

  const fetchingItemValue = (currData) => {
    fetchingItem(currData?.ComponentName);
  };

  console.log('displayedComponents',displayedComponents);

  return (
    <div className="component-dropdown" ref={ref}>
      {displayedComponents?.map((currData, index) => (
        <div className="frame-wrapper" key={index}>
          <div className="div">
            <p
              className="text-wrapper"
              onClick={() => fetchingItemValue(currData)}
            >
              {currData.ComponentName}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropDown;
