'use client';

import axios from 'axios'
import localFont from 'next/font/local';
import { Josefin_Sans, Poppins, Roboto } from 'next/font/google';
import React, { useEffect, useState } from 'react'
import RackSearch from '../../../components/RackSearch';

const RacksList = [
  "r-9-a", "r-10-a", "r-7-b",
  "r-10-b", "r-7-a", "r-11-a", 
  "r-6-b", "r-11-b", "r-6-a",
  "r-12-a", "r-5-b", "r-12-b",
  "r-5-a", "r-13-a", "r-4-b",
  "r-13-b", "r-4-a", "r-14-a",
  "r-3-b", "r-14-b", "r-3-a",
  "r-15-a", "r-2-b", "r-15-b",
  "r-2-a", "r-16-a", "r-1-a",
  "r-16-b", "r-17-a", "r-17-b",
  "r-18-a", "r-18-b", "r-19-a"
]

interface SectionsType {
  [key: string]: {
    "_id": string,
    "records": string[]
  }
}

interface RackDetailsType {
  "_id": string,
  "rack": string,
  "records": string[],
  "sections": SectionsType,
  "rack_route": string
}

const roboto = Roboto({weight: "700", subsets: ["latin"]})
const josefin_bold = Josefin_Sans({ weight: "600", subsets: ['latin'] })
const poppins = Poppins({weight: "600", subsets: ["latin"]})
const farumaFont = localFont({src: "../../../../public/assets/fonts/Faruma.otf"})

function range(start: number, end: number) {
  return Array(end - start + 1).fill(0).map((_, index) => start + index)
}

const RackPage = ({
  params,
}: {
  params: { rackId: string, name: string, items: object, sections: boolean }
}) => {
  if (RacksList.includes(params.rackId.toLowerCase()) === false) {
    return ( <div className='text-center text-white mt-10'>Not Found</div> )
  } 

  const [rackDetails, setRackDetails] = useState<RackDetailsType>()
  const [sectionView, setSectionsView] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const getRackDeets = async () => {
      try {
        const response = await axios.get(`http://10.12.29.68:8000/racks/${params.rackId.toLowerCase()}/`)
        const rack: RackDetailsType = response.data
        setRackDetails(rack)
        if (rack.records.length === 0) { setSectionsView(true) } else { setSectionsView(false) }
        
      } catch (error) {
        console.log(error.message)
      }
    }
    if (!rackDetails) getRackDeets()
  }, [rackDetails, sectionView])
  

  return (
    <div className='text-xl text-white mt-10 mx-20'>
      { rackDetails && 
        <div className='flex flex-col gap-5 my-8 justify-center'>
          <h1 className={`${josefin_bold.className} text-center text-3xl`}>{rackDetails.rack}</h1>
          
          <RackSearch setSearch={setSearchTerm}/>
        </div>
      }
      {rackDetails && sectionView ?
        <div>
          <div className="grid grid-cols-2 border-2 border-[#D4A056] font-faruma">
            {range(1, 8).map((section, i) => (
              <div 
              key={i} 
              dir='rtl' 
              className={`p-3 border-2 border-[#D4A056] ${rackDetails.sections[section]?.records.length > 10 ? 'h-[500px] overflow-y-scroll' : 'h-[250px]'}`}
              >
                <h2 className={`${poppins.className} text-2xl mb-4 text-center`}>{rackDetails.sections[section]._id}</h2>
                {
                  rackDetails.sections[section]?.records.length != 0 ? 
                  <div className='flex flex-col gap-3 text-md'>
                    {rackDetails.sections[section]?.records.map((item, index) => (
                      item.includes(searchTerm) && <div key={index}>{item}</div>
                    ))}
                  </div>
                  :
                  <div className='flex flex-col gap-3 text-md text-center mt-5'>
                  -
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
        :
        // If the rack sections are not seperated show the following
        <div dir='rtl' className="font-faruma">
          <div className='overflow-y-scroll h-[450px] border-2 p-3 border-[#D4A056]'>
            <div className='flex flex-col gap-3 text-md'>
              {rackDetails?.records.map((item, index) => (
                item.includes(searchTerm) && <div key={index}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default RackPage
