import React, { Dispatch } from 'react'

import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'

interface ShowPasswordProps {
    checker: boolean;
    type: string;
    setChecker: React.Dispatch<React.SetStateAction<boolean>>;
    dispatch: Dispatch<{ type: string, inputType: string }>;
}

const ShowPasswordButton:React.FC<ShowPasswordProps> = ({ 
    checker, 
    type,
    setChecker, 
    dispatch 
}) => {

  return (
    <>
        <button 
            className='text-center mt-1 w-auto text-2xl p-1 bg-gray-400 text-white rounded-md'
            type='button' 
            title='show password'
            onClick={() => {
            if(checker == false) {
                dispatch({ type: 'changed_type', inputType: 'password' })
                setChecker(true)
            } else {
                dispatch({ type: 'changed_type', inputType: 'text' })
                setChecker(false)
            }
            }}>
            { type === 'text' ? <AiOutlineEyeInvisible /> : <AiOutlineEye />  }
        </button> 
    </>
  )
}

export default ShowPasswordButton