'use client';

import Image from "next/image"
import rack from "../../public/assets/border-rack-light.png"
import { useState, useEffect } from "react"
import Popup from "./Popup";
import axios from 'axios';

const Main = () => {
    const [rackDetails, setRackDetails] = useState(null)
    const [popup, showPopup] = useState(false)
    const [popupDetail, setPopupDetails] = useState({
      name: '',
      items: [],
    })

    const rack_list = [
        ["R-9 A", "No Label"],
        ["R-10 A", "R-7 B"],
        ["R-10 B", "R-7 A"],
        ["R-11 A", "R-6 B"],
        ["R-11 B", "R-6 A"],
        ["R-12 A", "R-5 B"],
        ["R-12 B", "R-5 A"],
        ["R-13 A", "R-4 B"],
        ["R-13 B", "R-4 A"],
        ["R-14 A", "R-3 B"],
        ["R-14 B", "R-3 A"],
        ["R-15 A", "R-2 B"],
        ["R-15 B", "R-2 A"],
        ["R-16 A", "R-1 A"],
        ["R-16 B", ""],
        ["R-17 A", ""],
        ["R-17 B", ""],
        ["R-18 A", ""],
        ["R-18 B", ""],
        ["R-19 A", ""],
    ]
    
    const RackParentCss = "relative hover:scale-110 hover:cursor-pointer transition-all duration-300"
    const RackCss = "rack static mx-auto my-auto drop-shadow-lg"
    const labelCss = "absolute px-2 lg:px-5 lg:py-2 rounded-full bg- -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-[#D4A056] text-sm md:text-2xl font-semibold z-20"

    useEffect(()=> {
      const getRecords = async () => {
        try {
          const response = await axios.get('api/rack')
          const records = response.data.records
          setRackDetails(records)
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

    const handlePopup = (detail) => {
      try {
        setPopupDetails({name: detail, items: rackDetails[detail.toLowerCase()]})
      } catch (error) {
        console.log(error.message)
      }
      showPopup(!popup)
    }

    return (
        <div className="my-10">
      <div className="relative grid grid-cols-1 gap-7 justify-center place-items-center mx-auto lg:w-3/5 w-11/12 opacity">
      {
        rack_list.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-7">
            <div id="1" className={RackParentCss} onClick={() => handlePopup(item[0])}>
              <div className={labelCss}>{item[0]}</div>
              <Image
              id={index}
              src={rack}
              alt="rack"
              className={RackCss}
              />
            </div>

            {item[1] != "" ? 
              <div className={RackParentCss} onClick={() => handlePopup(item[1])}>
                <div className={labelCss}>{item[1]}</div>
                <Image
                id={index}
                src={rack}
                alt="rack"
                className={`${RackCss} rotate-180`}
                />
              </div>
            : null }
          </div>
        ))
      }
      <Popup show={popup} close={showPopup} rackName={popupDetail.name} rackItems={popupDetail.items} />
      </div>
    </div>
    )
}

export default Main
