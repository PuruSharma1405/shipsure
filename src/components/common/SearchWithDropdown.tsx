

import { BsSearch} from "react-icons/bs";
import DropDown from "@/components/createRequisitionSpares/DropDown";
import { FormControl } from "@mui/material";


interface SelectBoxProps {
  label: string;
  value: any;
  showDropDown: boolean;
  onChange: (e: any) => void;
  setShowDropDown: any;
  fechingItem: any;
}

export const SearchWithDropDown: React.FC<SelectBoxProps> = ({ label, value, showDropDown, setShowDropDown, fechingItem, onChange }) => {
  return (
    <>
       <FormControl fullWidth  variant="filled">
        <div className="flex flex-col mt-5">
                    <p className="ml-2">
                    {label} <sup className="text-red-500">*</sup>
                    </p>
                    <div className="flex flex-row items-center">
                    <input
                        type="text"
                        placeholder= {label}
                        className="outline-none bg-transparent ml-2 mt-2 w-[100%]"
                        value={value}
                        onChange={onChange}
                    />
                    <BsSearch />
                    </div>
                    <div className="border border-[#052E2B] w-[100%] mt-2"></div>
                    {value.length > 0 && showDropDown && (
                    <DropDown
              fetchingItem={fechingItem}
              showDropDown={showDropDown}
              setShowDropdown={setShowDropDown}
              componentName={value} searchComponent={undefined} setSearchComponent={undefined}                    />
                    )}
                </div>
        </FormControl>

    </>
  );
};

