'use client';

import Image from "next/image"
import rack from "../../public/assets/border-rack-light.png"
import { useEffect, useState } from "react"
import Popup from "@/components/Popup";

export default function Home() {
  const [down, setDown] = useState(false)
  const [move, setMove] = useState('')
  const [popup, showPopup] = useState(false)

  const RackParentCss = "relative hover:scale-110 hover:cursor-pointer transition-all duration-300"
  // const RackCss = "rack static mx-auto my-auto hover:cursor-pointer transition-all duration-300"
  const RackCss = "rack static mx-auto my-auto drop-shadow-lg"
  const rackMovement = "translate-y-[250px] mb-[250px]"
  const labelCss = "absolute px-2 lg:px-5 lg:py-2 rounded-full bg-[#D4A056] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white text-sm md:text-2xl font-semibold z-20"

  const handleMovement = (e) => {
    setDown(!down)
    if (!document.getElementById(e.target.id).className.includes(rackMovement)) {
      document.getElementById(e.target.id).className = `${RackCss} ${rackMovement}`
      setMove(rackMovement)
    } else {
      document.getElementById(e.target.id).className = RackCss
      setMove('')
    }
  }

  const handlePopup = () => {
    showPopup(!popup)
  }

  return (
    <div className="mt-10">
      <div className="relative grid grid-cols-2 gap-7 justify-center place-items-center mx-auto lg:w-3/5 w-11/12 opacity">
      <div id="1" className={RackParentCss} onClick={() => handlePopup()}>
        <div className={labelCss}>R-1</div>
        <Image
        id="rack-1"
        src={rack}
        alt="rack"
        className={RackCss}
        />
      </div>

      <div className={RackParentCss}>
        <div className={labelCss}>R-1</div>
        <Image
        id="rack-2"
        src={rack}
        alt="rack"
        className={RackCss}
        onClick={() => handlePopup()}
        />
      </div>
      
      <div className={RackParentCss}>
        <div className={labelCss}>R-1</div>
        <Image
        id="rack-3"
        src={rack}
        alt="rack"
        className={RackCss}
        onClick={() => handlePopup()}
        />
      </div>
      
      <div className={RackParentCss}>
        <div className={labelCss}>R-1</div>
        <Image
        id="rack-4"
        src={rack}
        alt="rack"
        className={RackCss}
        onClick={() => handlePopup()}
        />
      </div>
      
      <div className={RackParentCss}>
        <div className={labelCss}>R-1</div>
        <Image
        id="rack-5"
        src={rack}
        alt="rack"
        className={RackCss}
        onClick={() => handlePopup()}
        />
      </div>
      
      <div className={RackParentCss}>
        <div className={labelCss}>R-1</div>
        <Image
        id="rack-6"
        src={rack}
        alt="rack"
        className={RackCss}
        onClick={() => handlePopup()}
        />
      </div>
      
      <div className={RackParentCss}>
        <div className={labelCss}>R-1</div>
        <Image
        id="rack-7"
        src={rack}
        alt="rack"
        className={RackCss}
        onClick={() => handlePopup()}
        />
      </div>
      
      <div className={RackParentCss}>
        <div className={labelCss}>R-1</div>
        <Image
        id="rack-8"
        src={rack}
        alt="rack"
        className={RackCss}
        onClick={() => handlePopup()}
        />
      </div>
      
      <div className={RackParentCss}>
        <div className={labelCss}>R-1</div>
        <Image
        id="rack-9"
        src={rack}
        alt="rack"
        className={RackCss}
        onClick={() => handlePopup()}
        />
      </div>



      <Popup show={popup} close={showPopup} />
      </div>
    </div>
  )
}
