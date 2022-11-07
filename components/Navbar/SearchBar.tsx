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
                <div className='flex items-center space-x-2 p-2 text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition duration-300 focus:outline-none bg-white hover:border-gray-400 focus:ring-2 focus:ring-blue-500'>
                    <div><SearchIcon/></div>
                    <div className=' w-full'>
                        <input
                            onFocus={()=>{setIsOpenSearchContainer(true)}}
                            onBlur={()=>{setIsOpenSearchContainer(false)}}
                            onChange={handleOnChangeSearchText}
                            type="text"
                            value={searchText}
                            placeholder="Search ..."
                            className="w-full py-2 px-4 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none"
                        />
                    </div>
                    <div className='' onClick={deleteTextOnSearchBar}>
                        <XCircleIcon />
                    </div>
                </div>
                {
                    isOpenSearchContainer && (
                        <div className='absolute z-[15] w-full bg-white shadow-lg border rounded py-2 mt-1.5 text-sm text-gray-700'>
                            <div className='max-h-72 overflow-y-auto overflow-y-scroll'>
                                <div className='px-2.5'>
                                    <div className='block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded text-gray-500 hover:bg-blue-100 hover:text-blue-500'>Cadillac</div>
                                    <div className='block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded text-gray-500 hover:bg-blue-100 hover:text-blue-500'>Cadillac</div>
                                    <div className='block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded text-gray-500 hover:bg-blue-100 hover:text-blue-500'>Cadillac</div>
                                    <div className='block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded text-gray-500 hover:bg-blue-100 hover:text-blue-500'>Cadillac</div>
                                    <div className='block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded text-gray-500 hover:bg-blue-100 hover:text-blue-500'>Cadillac</div>
                                    <div className='block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded text-gray-500 hover:bg-blue-100 hover:text-blue-500'>Cadillac</div>
                                    <div className='block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded text-gray-500 hover:bg-blue-100 hover:text-blue-500'>Cadillac</div>
                                    <div className='block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded text-gray-500 hover:bg-blue-100 hover:text-blue-500'>Cadillac</div>
                                    <div className='block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded text-gray-500 hover:bg-blue-100 hover:text-blue-500'>Cadillac</div>
                                    <div className='block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded text-gray-500 hover:bg-blue-100 hover:text-blue-500'>Cadillac</div>
                                    <div className='block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded text-gray-500 hover:bg-blue-100 hover:text-blue-500'>Cadillac</div>
                                    <div className='block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded text-gray-500 hover:bg-blue-100 hover:text-blue-500'>Cadillac</div>
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