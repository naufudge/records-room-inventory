

const Popup = ({ show, close }) => {
    if (!show) return null;

    const handlePopupClose = (e) => { if (e.target.id === "popup") close(false) }


    return (
        <div
        id='popup'
        onClick={(e) => handlePopupClose(e)}
        className='blurry-bg fixed inset-0 bg-gray-200 bg-opacity-30 backdrop-blur-md flex justify-center items-center z-50'>
            <div className="bg-sky-50 px-11 py-6 rounded-lg drop-shadow-md text-center flex flex-col gap-2 pop-up">
                <div>
                    <h1 className="font-bold text-xl underline">Details</h1>
                    <span className="my-3 mx-4 px-2 py-0 right-0 top-0 translate-x-1 rounded-full bg-sky-400 text-white text-lg absolute hover:cursor-pointer hover:bg-sky-300"
                    onClick={() => close(false)}
                    >x</span>
                </div>
                <div>TEST</div>
            </div>
        </div>
    )
}

export default Popup;
