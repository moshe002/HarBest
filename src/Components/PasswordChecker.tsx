import React from 'react'

interface PasswordProps {
    passwordText: string;
    textColor: string;
}

const PasswordChecker:React.FC<PasswordProps> = ({ passwordText, textColor }) => {
  return (
    <>
        <p className={`text-xs ${textColor}`}>
            {passwordText}
        </p>
    </>
  )
}

export default PasswordChecker