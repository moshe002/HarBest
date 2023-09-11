import React from 'react'

import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'

interface ShowPasswordProps {
    checker: boolean;
    changeType: string;
    setChecker: React.Dispatch<React.SetStateAction<boolean>>;
    setChangeType: React.Dispatch<React.SetStateAction<string>>;
}

const ShowPasswordButton:React.FC<ShowPasswordProps> = ({ 
    checker, 
    changeType,
    setChecker, 
    setChangeType 
}) => {

  return (
    <>
        <button 
            className='text-center mt-1 w-auto text-2xl p-1 bg-gray-400 text-white rounded-md'
            type='button' 
            title='show password'
            onClick={() => {
            if(checker == false) {
                setChangeType('text')
                setChecker(true)
            } else {
                setChangeType('password')
                setChecker(false)
            }
            }}>
            { changeType == 'text' ? <AiOutlineEyeInvisible /> : <AiOutlineEye />  }
        </button> 
    </>
  )
}

export default ShowPasswordButton