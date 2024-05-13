import localFont from 'next/font/local';
import '../../styles/popup.css'

const farumaFont = localFont({ src: '../../public/assets/fonts/Faruma.otf' })

const Popup = ({ show, close, rackName, rackItems }) => {
    if (!show) return null;
    const handlePopupClose = (e) => { if (e.target.id === "popup-background") close(false) }

    return (
        <div
        id='popup-background'
        onClick={(e) => handlePopupClose(e)}
        className='blurry-bg fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex justify-center items-center z-50'>
            <div className="bg-[#333C4B] max-h-[500px] p-6 rounded-lg drop-shadow-lg text-center flex flex-col gap-2 pop-up">
                <div>
                    <h1 className="font-bold text-2xl text-[#D4A056]">{rackName}</h1>
                    <span className="my-3 mx-4 px-2 py-0 right-0 top-0 translate-x-1 rounded-full bg-[#333C4B] text-white text-lg absolute hover:cursor-pointer hover:bg-[#4A4C5C]"
                    onClick={() => close(false)}
                    >x</span>
                </div>
                <div dir='rtl' className={`text-white px-5 ${rackItems?.length > 18 ? "overflow-y-scroll" : ""} text-lg`}>
                    {rackItems?.map((item, index) => (
                        <p id={index} className={farumaFont.className}>{item}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Popup;
