import React, { Dispatch, SetStateAction } from 'react'

const RackSearch = ({setSearch}: {setSearch: Dispatch<SetStateAction<string>>}) => {
  return (
    <div dir='rtl' className='text-center'>
        <div className="flex mx-auto max-w-[1000px] bg-[#333C4B] max-h-[500px] rounded-xl drop-shadow-xl text-center gap-2">
            <input 
            className='px-4 py-4 w-full text-xl border border-slate-500 border-opacity-30 bg-transparent rounded-xl focus:outline-none placeholder:px-1 font-faruma '
            placeholder='ހޯދާ !'
            onChange={(e) => {setSearch(e.target.value)}}
            />
        </div>
    </div>
  )
}

export default RackSearch
