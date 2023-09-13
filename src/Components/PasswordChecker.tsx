import React from 'react'

interface PasswordProps {
    passwordText: string;
    passwordColor: string;
}

const PasswordChecker:React.FC<PasswordProps> = ({ passwordText, passwordColor }) => {
  return (
    <>
        <p className={`text-xs ${passwordColor}`}>
            {passwordText}
        </p>
    </>
  )
}

export default PasswordChecker