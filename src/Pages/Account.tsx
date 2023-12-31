import { useState, useEffect } from 'react'
import { supabase } from '../supabase-config'
import { VscAccount } from 'react-icons/vsc'

import BackButton from '../Components/BackButton'
import DeletePost from '../Components/DeletePost'
import EditPost from '../Components/EditPost'
import LogoutButton from '../Components/LogoutButton'

interface PostProps {
  itemName: string;
  caption: string;
  emailOfSeller: string;
  nameOfSeller: string;
  location: string;
  quantity: number;
  price: number;
  id: string;
  imgUrl: string;
}

interface LogoutProp {
  setSession: React.Dispatch<React.SetStateAction<boolean>>;
}

const Account:React.FC<LogoutProp> = ({ setSession }) => {

  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [getUserPosts, setGetUserPosts] = useState<PostProps[]>([])
  const [checker, setChecker] = useState<boolean>(false)

  useEffect(() => {
    getUserData()
  }, [checker])

  const getUserData = async () => {
    setLoading(true)
    await userDetails()
    setLoading(false)
    setChecker(false)
  } 

  const userDetails = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUsername(user?.user_metadata.username)
    setEmail(user?.email)
    let username:string = user?.user_metadata.username
    await userPosts(username)
  }

  const userPosts = async (username:string) => {
    const { data, error } = await supabase
    .from('posts')
    .select()
    .eq('nameOfSeller', username)
    if(data){
      //console.log(data)
      setGetUserPosts(data.reverse())
    } 
    error && console.log(error) 
  }

  return (
    <div className='flex flex-col relative gap-3 p-3 items-center h-screen w-full overflow-auto'>
      <div className='fixed top-10 left-10'>
        <BackButton buttonText='Back to homepage' />
      </div>
      <div className='fixed top-10 right-10'>
        <LogoutButton setSession={setSession} />
      </div>
      <div className='flex flex-col gap-3 items-center p-3'>
        <h1 className='text-7xl'><VscAccount /></h1>
        {
          loading
          ?
            <h1 className='mt-5 text-3xl text-gray-400 font-bold animate-pulse'>Fetching data...</h1>
          :
          <>
            <div className='text-center'>
              <h1 className='text-3xl'>{username}</h1>
              <p className='text-sm text-green-500 font-semibold'>username</p>
            </div>
            <div className='text-center'>
              <h1 className='text-3xl'>{email}</h1>
              <p className='text-sm text-green-500 font-semibold'>email</p>
            </div>
          </>
        }
      </div>
      { 
        loading 
        ? 
        <h1 className='mt-3 text-3xl text-gray-400 font-bold animate-pulse'>Patience is a virtue...</h1>
        : 
        <>
        <h1 className='text-xl font-semibold underline'>Posts you made:</h1>
        <div className='flex flex-wrap w-full gap-10 p-3 rounded-md justify-center'>
          {
            getUserPosts.length == 0 
            ?
            <>
              <div className='mt-5'>
                <h1 className='font-bold text-gray-400 text-xl'>It's empty here...</h1>
              </div>
            </>
            :
            getUserPosts.map((data, index) => {
              return(
                <div className='flex flex-col gap-1 justify-center' key={index}>
                  <div
                    className='flex flex-col items-center gap-3 text-center shadow-xl border-2 border-gray-400 p-5 rounded-md'>
                      <h1 className='font-semibold text-green-500'>{data.nameOfSeller}</h1>
                      <h1 className='text-lg font-bold'>{data.itemName}</h1>
                      <h1 className='text-base'>{data.caption}</h1>
                      <img className='rounded-md w-auto h-40' src={`${data.imgUrl}`} alt="image_of_item" />
                      <h1 className='font-bold'>
                        Location:&nbsp; 
                        <i className='text-gray-400'>
                          {data.location}
                        </i>
                      </h1>
                      <div className='flex gap-3'>
                        <h1 className='font-bold'>Quantity: <b className='text-blue-400'>{data.quantity}</b></h1>
                        <h1 className='font-bold'>Price: <b className='text-red-400'>{data.price}</b></h1>
                      </div>
                  </div>
                  <div className='flex flex-row gap-2 justify-center items-center'>
                    <EditPost
                      id={data.id}
                      name={data.nameOfSeller}
                      itemName={data.itemName}
                      caption={data.caption}
                      imgUrl={data.imgUrl}
                      quantity={data.quantity}
                      location={data.location}
                      price={data.price}
                      setChecker={setChecker} />
                    <DeletePost imgUrl={data.imgUrl} id={data.id} setChecker={setChecker} />
                  </div>
                </div>
              )
            })
          }
        </div>
        </>
      }
    </div>
  )
}

export default Account