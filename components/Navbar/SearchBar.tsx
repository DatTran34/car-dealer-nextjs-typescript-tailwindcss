import Link from 'next/link'
import React, { useState } from 'react'
import { SearchIcon, XCircleIcon } from '../Icon'
import { colors } from '../Types/data'
import { ICar } from '../Types/model'

function SearchBar({ cars }: { cars: ICar[] }) {

    const [searchText, setSearchText] = useState<string>("")
    const [isOpenSearchContainer, setIsOpenSearchContainer] = useState<boolean>(false)
    const [searchedResult, setSearchedResult] = useState<ICar[]>([])
    const handleOnChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const results = cars.filter(car => {
            const searchData : string = car.model_make_id + " " + car.model_name + " " + car.model_year
            return searchData.toLowerCase().includes(e.target.value.toLowerCase()) 
        })
        setSearchedResult(results)
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
                            onFocus={() => { setIsOpenSearchContainer(true) }}
                            onBlur={() => { setIsOpenSearchContainer(false) }}
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
                                <div className='px-2.5'>
                                    {
                                        searchText === "" ? <div className='text-gray-500'>No posts match the query</div>
                                            : searchedResult.length === 0 ? <div className='text-gray-500'>No items matched with your seaching</div> :
                                                <div>{
                                                    searchedResult.map((car, idx) =>
                                                        <Link
                                                            href={{
                                                                pathname: "/productPage",
                                                                query: { id: car.id }, // the data
                                                            }}
                                                        >
                                                            <div className='flex flex-row items-center space-x-2 p-2 cursor-pointer text-gray-500 hover:bg-blue-100 hover:text-blue-500' key={idx}>
                                                                <img
                                                                width={50}
                                                                    className="object-contain"
                                                                    src={`https://cdn.imagin.studio/getImage?&customer=copyright-imaginstudio&make=${car.model_make_id
                                                                        }&modelFamily=${car.model_name}&paintId=${colors[car.model_color]
                                                                        }&fileType=webp&angle=23&aspectRatio=1.6&zoomType=fullscreen&width=1600&v3=true&margins=0`}
                                                                    alt="car"
                                                                    loading="lazy"
                                                                />
                                                                <div>{car.model_year} {car.model_make_id} {car.model_name} - {car.model_mileage} mileages</div>
                                                            </div>
                                                        </Link>

                                                    )
                                                }</div>
                                    }
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