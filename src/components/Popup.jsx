const Popup = ({ show, close, rackName }) => {
    if (!show) return null;

    const handlePopupClose = (e) => { if (e.target.id === "popup") close(false) }


    return (
        <div
        id='popup'
        onClick={(e) => handlePopupClose(e)}
        className='blurry-bg fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex justify-center items-center z-50'>
            <div className="bg-[#333C4B] px-11 py-6 rounded-lg drop-shadow-lg text-center flex flex-col gap-2 pop-up">
                <div>
                    <h1 className="font-bold text-xl text-[#D4A056]">{rackName}</h1>
                    <span className="my-3 mx-4 px-2 py-0 right-0 top-0 translate-x-1 rounded-full bg-[#333C4B] text-white text-lg absolute hover:cursor-pointer hover:bg-[#4A4C5C]"
                    onClick={() => close(false)}
                    >x</span>
                </div>
                <div className="text-white">
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                </div>
            </div>
        </div>
    )
}

export default Popup;
