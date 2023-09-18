import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

interface Props {
    setSuccessPost: React.Dispatch<React.SetStateAction<boolean>>;
    setPost: React.Dispatch<React.SetStateAction<boolean>>;
}

const SuccessPost:React.FC<Props> = ({ setSuccessPost, setPost }) => {
  
    const handleOnClose = () => {
        setSuccessPost(false)
        setPost(false)
    }

    return (
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
        <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
            <h1 className='font-bold text-3xl text-green-500'>Successfully Posted!</h1>
            <button className='cursor-pointer hover:bg-gray-300 rounded-full duration-150' onClick={handleOnClose} title='close btn' type='button'>
                <p className='text-4xl p-1'>
                    <AiOutlineCloseCircle />
                </p>
            </button>
        </div>
    </div>
  )
}

export default SuccessPost