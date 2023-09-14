
import AccountButton from './AccountButton'
import LogoutButton from './LogoutButton'

function LogoutAndAccountContainer() {
  return (
    <div className='flex flex-col items-center justify-between p-3 w-2/6'>
        <AccountButton />
        <LogoutButton />
    </div>
  )
}

export default LogoutAndAccountContainer