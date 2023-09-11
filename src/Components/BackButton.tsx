import React from 'react'
import { useNavigate } from "react-router-dom";

interface ButtonText {
  buttonText: string;
}

const BackButtons:React.FC<ButtonText> = ({ buttonText }) => {

  const navigate = useNavigate();
  
  return (
    <>
        <button
            onClick={() => navigate(-1)}
            className='p-3 font-semibold bg-blue-400 hover:bg-blue-500 text-white rounded-md duration-150' 
            type='button' 
            title='this is button'>
                {buttonText}
        </button>
    </>
  )
}

export default BackButtons