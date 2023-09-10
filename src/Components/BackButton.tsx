import React from 'react'

interface ButtonText {
  buttonText: string;
}

const BackButtons:React.FC<ButtonText> = ({ buttonText }) => {
  return (
    <>
        <button
            className='p-3 font-semibold bg-blue-400 hover:bg-blue-500 text-white rounded-md duration-150' 
            type='button' 
            title='this is button'>
                {buttonText}
        </button>
    </>
  )
}

export default BackButtons