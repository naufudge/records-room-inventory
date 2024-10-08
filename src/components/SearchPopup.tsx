'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import localFont from 'next/font/local';
import { Search } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const farumaFont = localFont({ src: '../../public/assets/fonts/Faruma.otf' })

interface RecordType {
  name: string
  rack: string
}

const SearchPopup = () => {
  const [popup, showPopup] = useState(false);
  const [records, setRecords] = useState<RecordType[]>()
  

  useEffect(()=> {
    const getRecords = async () => {
      try {
        const response = await axios.get('http://10.12.29.68:8000/records/all/')
        const records = response.data
        setRecords(records)
      } catch (error) {
        console.log(error.message)
      }
    }
    if (!records) getRecords();
    
    if (popup) {
      document.body.classList.add("overflow-y-hidden")
    } else {
      document.body.classList.remove("overflow-y-hidden")
    }
  }, [records, popup])

  return (
    <div>
      {popup && records && <SearchClick show={popup} close={showPopup} records={records} />}
      <div className='relative'>
        <div className='absolute top-0 right-0 mr-5'>
          <div className='p-3 rounded-full transition duration-150 hover:bg-slate-400 hover:cursor-pointer'>
            <Search color='#ffffff' onClick={() => {showPopup(!popup)}} />
          </div>
        </div>
      </div>
    </div>
  )
}

const SearchClick = ({ show, close, records }: {show: boolean, close: Dispatch<SetStateAction<boolean>>, records: RecordType[]}) => {
  if (!show) return null;
  const [reverseRackDetails, setReverseRackDetails] = useState({})
  const [Results, setResults] = useState<RecordType[]>([])
  const handlePopupClose = (e: any) => { if (e.target.id === "popup-background") close(false) }

  const router = useRouter()

  const search_handler = (searchTerm: string) => {
    let results = []
    if (records) {
      records.filter((item)=> {
        if(item.name.startsWith(searchTerm) || item.name.includes(searchTerm)) {
          results.push(item);
        } else if (item.name.includes(searchTerm)) {
          results.push(item);
        } else if (searchTerm === "") {
          results = []
        }
      })
      setResults(results);
    }
  }

  const handleSearchResultClick = (record: RecordType) => {
    router.push(`/racks/${record.rack.toLowerCase().replace(" ", "-")}`)
    close(false)
  }

  return (
    <div
        dir='rtl'
        lang='dv'
        id='popup-background'
        onClick={(e) => handlePopupClose(e)}
        className="font-faruma text-lg flex flex-col blurry-bg fixed inset-0 pt-[50px] bg-black text-white bg-opacity-30 backdrop-blur-md justify-start items-center z-50 md:px-auto sm:px-[50px] px-[25px]">
          <div className="flex mx-3 w-full max-w-[1000px] bg-[#333C4B] max-h-[500px] rounded-xl drop-shadow-lg text-center gap-2 pop-up">
            <input 
              className='px-4 py-4 w-full text-xl border border-slate-500 border-opacity-30 bg-transparent rounded-xl focus:outline-none placeholder:px-1'
              placeholder='ހޯދާ!'
              onChange={(e) => search_handler(e.target.value)}
            />

          </div>
          <div className='flex flex-col gap-1 bg-[#333C4B] my-[50px] w-full max-w-[1000px] rounded-xl drop-shadow-lg overflow-y-auto'>
            {Results.map((item, index) => (
              <div 
              key={index} 
              className='flex flex-row w-full px-2 pl-4 justify-between transition-all duration-200 hover:bg-slate-600 hover:cursor-pointer'
              onClick={() => {handleSearchResultClick(item)}}
              >
                <div className='p-4'>{item.name}</div>
                <div className='text-right my-auto opacity-20'>{item.rack.toUpperCase()}</div>
              </div>
            ))}
          </div>
    </div>
  )
}

export default SearchPopup;
