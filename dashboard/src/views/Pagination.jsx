import React from 'react';
import { MdOutlineKeyboardDoubleArrowLeft,MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";


const Pagination = ({pageNumber,setPageNumber,totalItem,parPage,showItem}) => {

    // Umumi item sayi ve her sehifede gosterilen item sayina gore page sayi hesablanir.
    let totalPage = Math.ceil(totalItem / parPage)
    let startPage = pageNumber

    // Son sehifelere yaxinlasanda button araligi saga dasmasin deye startPage geri cekilir.
    let dif = totalPage - pageNumber
    if (dif <= showItem) {
        startPage = totalPage - showItem
    }
    let endPage = startPage < 0 ? showItem : showItem + startPage
     
    if (startPage <= 0) {
        startPage = 1
    }

    const createBtn = () => {

        // Gosterilecek page button-lari dinamik yaradilir.
        const btns = []
        for (let i = startPage; i < endPage; i++) {
            btns.push(
                <li onClick={()=>setPageNumber(i)} className={` ${pageNumber === i ? 'bg-indigo-300 shadow-lg shadow-indigo-300/50 text-white' : 'bg-slate-600 hover:bg-indigo-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]'} w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer `}>
                    {i}                    
                </li>
            ) 
        }
        return btns
    }

    return (
        <ul className='flex gap-3'>
            {
                // Birinci sehifede olanda prev button gizlenir.
                pageNumber > 1 && <li onClick={() => setPageNumber(pageNumber - 1)} className='w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer'>
                    <MdOutlineKeyboardDoubleArrowLeft />
                </li>
            }
            {
                createBtn()
            }
            {
                // Son sehifede olanda next button gizlenir.
                pageNumber < totalPage && <li onClick={() => setPageNumber(pageNumber + 1)} className='w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer'>
                    <MdOutlineKeyboardDoubleArrowRight  />
                </li>
            }

        </ul>
    )


};

export default Pagination;
