import React, { ReactNode, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
function FilterBox({title, optionList, setFilter} : {title: string , optionList: string[], setFilter:React.Dispatch<React.SetStateAction<any>>}) {

  const handleChange = (evt: ReactNode) => {
    setFilter(evt)
  };

  return (
    <div className="space-y-2">
      <div>{title}</div>
      <div className="w-full">
        <Select

          onChange={(evt: ReactNode) => {
            handleChange(evt);
          }}
          disabled = {optionList.length > 0 ? false : true}
        >
            {
               optionList.map((option,idx) => (
                <Option value={option}>{option}</Option>
            ))
            }
        </Select>
      </div>
    </div>
  );
}

export default FilterBox;
