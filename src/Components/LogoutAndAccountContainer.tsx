
import AccountButton from './AccountButton'
import LogoutButton from './LogoutButton'

interface LogoutProp {
  setSession: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutAndAccountContainer:React.FC<LogoutProp> = ({ setSession }) => {
  return (
    <div className='flex flex-col items-center justify-between p-3 w-2/6'>
        <AccountButton />
        <LogoutButton setSession={setSession} />
    </div>
  )
}

export default LogoutAndAccountContainer