'use client';

import { useState, useEffect } from 'react';
import localFont from 'next/font/local';
import { Search } from 'lucide-react';
import axios from 'axios';

const farumaFont = localFont({ src: '../../public/assets/fonts/Faruma.otf' })

const SearchPopup = () => {
  const [popup, showPopup] = useState(false);
  const [rackDetails, setRackDetails] = useState(null)

  useEffect(()=> {
    const getRecords = async () => {
      try {
        const response = await axios.get('http://10.12.29.68:8000/racks/')
        const records = response.data
        let results = {}
        records.filter((item) => {
          results[item.rack.toLowerCase()] = item.records
        })
        setRackDetails(results)
      } catch (error) {
        console.log(error.message)
      }
    }
    if (!rackDetails) getRecords();
    if (popup) {
      document.body.classList.add("overflow-y-hidden")
    } else {
      document.body.classList.remove("overflow-y-hidden")
    }
  }, [rackDetails, popup])

  return (
    <div>
      {popup && rackDetails && <SearchClick show={popup} close={showPopup} racks={rackDetails} />}
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

const SearchClick = ({ show, close, racks }) => {
  if (!show) return null;
  const [reverseRackDetails, setReverseRackDetails] = useState({})
  const [Records, setRecords] = useState([])
  const [Results, setResults] = useState([])
  const handlePopupClose = (e) => { if (e.target.id === "popup-background") close(false) }

  useEffect(() => {
    const formatRackDetails = () => {
      let records = []
      let reverse_rackDetails = {}
        for (const [key, value] of Object.entries(racks)) {
          value.filter((item) => {
            records.push(item);
            reverse_rackDetails[item] = key;
          })
        }
        setRecords(records);
        setReverseRackDetails(reverse_rackDetails);
    }

    if (racks && Records.length === 0) formatRackDetails();
  }, [Records, reverseRackDetails])

  const search_handler = (searchTerm) => {
    console.log(searchTerm)
    let results = []
    if (Records) {
      Records.filter((item)=> {
        if(item.startsWith(searchTerm) || item.includes(searchTerm)) {
          results.push(item);
        } else if (item.includes(searchTerm)) {
          results.push(item);
        } else if (searchTerm === "") {
          results = []
        }
      })
      setResults(results);
    }
  }

  return (
    <div
        dir='rtl'
        lang='dv'
        id='popup-background'
        onClick={(e) => handlePopupClose(e)}
        className={`${farumaFont.className} text-lg flex flex-col blurry-bg fixed inset-0 pt-[50px] bg-black text-white bg-opacity-30 backdrop-blur-md justify-start items-center z-50 md:px-auto sm:px-[50px] px-[25px]`}>
            <div className="flex mx-3 w-full max-w-[1000px] bg-[#333C4B] max-h-[500px] rounded-xl drop-shadow-lg text-center gap-2 pop-up">
              <input 
              className='px-4 py-4 w-full text-xl border border-slate-500 border-opacity-30 bg-transparent rounded-xl focus:outline-none placeholder:px-1'
              placeholder='ހޯދާ!'
              onChange={(e) => search_handler(e.target.value)}
              />

            </div>
            <div className='flex flex-col gap-1 bg-[#333C4B] my-[50px] w-full max-w-[1000px] rounded-xl drop-shadow-lg overflow-y-auto'>
              {Results.map((item, index) => (
                <div className='flex flex-row w-full transition-all duration-200 hover:bg-slate-600 hover:cursor-pointer'>
                  <div key={index} className='p-4'>{item}</div>
                  <div className='text-right my-auto opacity-20'>{reverseRackDetails[item].toUpperCase()}</div>
                </div>
              ))}
            </div>
        </div>
  )
}

export default SearchPopup;
