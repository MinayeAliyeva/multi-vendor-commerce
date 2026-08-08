import { List } from 'react-window';

// react-window scroll olunan siyahida sadece gorunen row-lari render edir.
// Bu, coxlu row olanda sehifeni daha suretli saxlayir.
function handleOnWheel({ deltaY }) {
    console.log('handleOnWheel',deltaY)
}

const PaymentRequest = () => {
    // List her setir ucun bu componenti cagirir; index setir nomresidir, style mutleq verilməlidir.
    const Row = ({ index, style }) => {
        return (
        <div style={style} className='flex text-sm text-white font-medium'>
        <div className='w-[25%] p-2 whitespace-nowrap'>{index + 1}</div>
        <div className='w-[25%] p-2 whitespace-nowrap'>$3434</div>
        <div className='w-[25%] p-2 whitespace-nowrap'>
            <span className='py-[1px] px-[5px] bg-slate-300 text-blue-500 rounded-md text-sm'>Pending</span>
         </div>
        <div className='w-[25%] p-2 whitespace-nowrap'> 25 Dec 2023 </div>
        <div className='w-[25%] p-2 whitespace-nowrap'>
            <button className='bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px] cursor-pointer text-white rounded-sm text-sm'>Confirm</button>
        </div>

            </div>
        )
    }





    return (
<div className='px-2 lg:px-7 pt-5'>
    <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <h2 className='text-xl font-medium pb-5 text-[#d0d2d6]'>Withdrawal Request</h2>
        <div className='w-full'>
            <div className='w-full overflow-x-auto'>
                <div className='flex bg-[#a7a3de] uppercase text-xs font-bold min-w-[340px] rounded-md'>
                    <div className='w-[25%] p-2'> No </div>
                    <div className='w-[25%] p-2'> Amount </div>
                    <div className='w-[25%] p-2'> Status </div>
                    <div className='w-[25%] p-2'> Date </div>
                    <div className='w-[25%] p-2'> Action </div> 
                </div>
                {
                    <List
                    // v2 API: rowCount sayi, rowHeight hundurluk, rowComponent ise setir componentidir.
                    style={{ minWidth : '340px', height: 350 }}
                    className='List'
                    rowCount={100}
                    rowHeight={35}
                    rowProps={{}}
                    rowComponent={Row}
                    onWheel={handleOnWheel}
                    />
                }

            </div>

        </div>

    </div>
    
</div>
    );
};

export default PaymentRequest;
