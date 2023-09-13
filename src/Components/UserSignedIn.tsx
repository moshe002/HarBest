import BackButton from './BackButton'

function UserSignedIn() {
  return (
    <div className='fixed top-0 left-0 p-5 w-full h-full flex justify-center items-center bg-gray-400 bg-opacity-40 z-50'>
        <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
            <h1 className='font-bold text-3xl text-center'>Account created!</h1>
            <BackButton buttonText='Login' />
        </div>
    </div>
  )
}

export default UserSignedIn