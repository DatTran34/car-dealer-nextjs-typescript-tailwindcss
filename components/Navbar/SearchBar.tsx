import React, { useState } from 'react'
import { SearchIcon, XCircleIcon } from '../Icon'

function SearchBar() {

    const [searchText, setSearchText] = useState<string>("")
    const [isOpenSearchContainer, setIsOpenSearchContainer] = useState<boolean>(false)
    const handleOnChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }

    const deleteTextOnSearchBar = () => {
        setSearchText("")
    }

    return (
        <div className='flex-grow z-[15]'>
            <div className='relative'>
                <div className='text-gray-500 bg-[#fdfdfd] border-2 border-gray-200 rounded-lg flex items-center py-1 px-2
                text-sm text-gray-500 transition duration-300 focus:outline-none hover:border-[#6882c2] focus:ring-3 focus:ring-blue-500'>
                    <div><SearchIcon/></div>
                    <div className=' w-full'>
                        <input
                            onFocus={()=>{setIsOpenSearchContainer(true)}}
                            onBlur={()=>{setIsOpenSearchContainer(false)}}
                            onChange={handleOnChangeSearchText}
                            type="text"
                            value={searchText}
                            placeholder="Search cars, brands, models"
                            className="w-full py-2 px-2 text-sm focus:border-gray-200 focus:ring-0 focus:outline-none bg-transparent"
                        />
                    </div>
                    <div className='' onClick={deleteTextOnSearchBar}>
                        <XCircleIcon/>
                    </div>
                </div>
                {
                    isOpenSearchContainer && (
                        <div className='absolute z-[15] w-full bg-white shadow-lg border mt-1.5 text-sm text-gray-700 rounded-lg'>
                            <div className='max-h-72 overflow-y-auto overflow-y-scroll'>
                                <div className=''>
                                    <div className='block transition duration-200 px-2 py-2 cursor-pointer select-none truncate 
                                    text-gray-500 hover:bg-[#f0f5ff] hover:text-blue-500'>Cadillac</div>
                                
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}


{/* <div className="relative flex-grow bg-[#becae3] text-[#777C91] flex flex-row p-2 rounded-[7px]">
            <SearchIcon />
            <input
                onChange={handleOnChangeSearchText}
                type="text"
                value={searchText}
                placeholder="Search ..."
                className="px-2 flex-grow bg-transparent outline-none text-sm text-[#1d344c] placeholder:text-gray-500"
            />
            <div onClick={() => { setSearchText("") }}><XCircleIcon /></div>
            <div className="mx-0 absolute left-0 top-10 z-10 w-full h-10 bg-[#becae3]">
                asdf
            </div>
        </div> */}
export default SearchBar