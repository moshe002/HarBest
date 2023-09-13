import React from 'react'
import { useNavigate } from "react-router-dom";

interface BackButtonText {
  buttonText: string;
}

const BackButton:React.FC<BackButtonText> = ({ buttonText }) => {

  const navigate = useNavigate();
  
  return (
    <>
        <button
            onClick={() => navigate(-1)}
            className='p-3 font-semibold bg-blue-400 hover:bg-blue-500 text-white rounded-md duration-150' 
            type='button' 
            title={buttonText}>
                {buttonText}
        </button>
    </>
  )
}

export default BackButton