
import React, { ReactNode, useEffect, useState } from "react";
import Select from 'react-tailwindcss-select';
import { Option } from "react-tailwindcss-select/dist/components/type";
// import { Select, Option } from "@material-tailwind/react";
function FilterBox({title, optionList, selectedFilter, setFilter} : {title: string , optionList: string[], selectedFilter? : string ,setFilter:React.Dispatch<React.SetStateAction<any>>}) {


  const [options, setOptions] = useState<Option[] >([])

  useEffect(() => {
    setOptions(optionList.map((option_) => {
      return {
        value: option_,
        label: option_,
      }
    }))
  }, [optionList])

  const [selectedOption, setSelectedOption] = useState<Option | Option[]  | null>(
    selectedFilter ? {
      value : selectedFilter,
      label : selectedFilter,
    } : null
  )
  const handleChange = (value?:Option | Option[] | null) => {

    if(value !== undefined && value !== null )
    {
      if(!Array.isArray(value))
      {
        setFilter(value.value)
      }
    }
    setSelectedOption(value ? value : null)

  }
  return (
      <div className={`w-full ${(title === "Category") &&  "z-[12]"} ${(title === "Model") &&  "z-[11]"} ${(title === "Sort By") &&  "z-10"}`}>
        <Select isSearchable={true} placeholder={title} isMultiple={false} searchInputPlaceholder={"seaching"} value={selectedOption} onChange={handleChange} options={options} />
        {/* <Select
          label={`${title}`}
          onChange={(evt: ReactNode) => {
            handleChange(evt);
          }}
          disabled={optionList.length > 0 ? false : true}
        >
          {optionList.sort().map((option, idx) => (
            <Option value={option}>{option}</Option>
          ))}
        </Select> */}
      </div>
  );
}

export default FilterBox;
