import React, { useState, useEffect, useRef } from "react";
import "./DropDown.css";
import useOnClickOutside from '../../hooks/useOnClickOutside';
import InfiniteScroll from "react-infinite-scroll-component";

const initialLoadCount = 60;
const loadMoreThreshold = 200;

const DropDown = ({ fetchingItem, showDropDown, setShowDropdown, componentName, searchComponent, setSearchComponent }) => {
  const [displayedComponents, setDisplayedComponents] = useState([]);
  const[items,setItems]=useState(Array.from({ length: 20 }))
  const[hasMore,setHasMore]=useState(true)
  const ref = useRef(null);

  const filterComponents = () => {
    const filteredData = searchComponent?.filter((currData) => {
      return currData.ComponentName.toLowerCase().includes(componentName.toLowerCase());
    });
    setDisplayedComponents(filteredData?.slice(0, searchComponent?.length));
  };

  useEffect(() => {
    filterComponents();
  }, [componentName, searchComponent]);

  const fetchingItemValue = (currData) => {
    fetchingItem(currData);
  };

  console.log('searchComponent',searchComponent,items?.length);

  const fetchMoreData = () => {
    console.log('scrolled',displayedComponents?.length,searchComponent?.length);
    if (displayedComponents.length >= searchComponent.length) {
      setHasMore(false);
      return;
    }
  
    const startIndex = displayedComponents.length;
    const endIndex = startIndex + initialLoadCount;
    const nextBatch = searchComponent.slice(startIndex, endIndex);
  
    setTimeout(() => {
      setDisplayedComponents((prev) => [...prev, ...nextBatch]);
    }, 500);
  };
  

  console.log('displayedComponents',displayedComponents,'items.length',items?.length);

  return (
    <div className="component-dropdown" ref={ref}>
      <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          height={400}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
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
        </InfiniteScroll>
      
    </div>
  );
};

export default DropDown;
