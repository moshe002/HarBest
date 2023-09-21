import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase-config'
import { VscAccount } from 'react-icons/vsc'

import BackButton from '../Components/BackButton'
import DeletePost from '../Components/DeletePost'
import EditPost from '../Components/EditPost'

interface PostProps {
  caption: string;
  emailOfSeller: string;
  nameOfSeller: string;
  location: string;
  price: number;
  id: string;
}

function Account() {

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
    <div className='flex flex-col gap-3 p-3 items-center h-screen w-full overflow-auto'>
      <div className='flex flex-col gap-3 items-center p-3'>
        <h1 className='text-7xl'><VscAccount /></h1>
        {
          loading
          ?
            <h1 className='mt-3 text-3xl text-gray-400 font-bold'>Fetching data...</h1>
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
        <h1 className='mt-3 text-3xl text-gray-400 font-bold'>Patience is a virtue...</h1>
        : 
        <div className='flex flex-col gap-3 p-3 rounded-md items-center'>
          <h1 className='text-xl font-semibold underline'>Posts you made:</h1>
          {
            getUserPosts.map((data, index) => {
              return(
                <div className='flex flex-row gap-1 justify-center' key={index}>
                  <div
                    className='flex flex-col items-center gap-3 text-center shadow-xl border-2 border-gray-400 p-5 rounded-md'>
                      <h1 className='font-semibold'>{data.nameOfSeller}</h1>
                      <h1 className='text-base'>{data.caption}</h1>
                      <img src="" alt="image_of_item" />
                      <h1 className='font-bold'>Location: <i className='text-gray-400'>{data.location}</i></h1>
                      <h1 className='font-bold'>Price: <i className='text-gray-400'>{data.price}</i></h1>
                  </div>
                  <div className='flex flex-col gap-2 justify-center'>
                    <EditPost />
                    <DeletePost id={data.id} setChecker={setChecker} />
                  </div>
                </div>
                
              )
            })
          }
        </div>
      }
      <BackButton buttonText='Back to homepage' />
    </div>
  )
}

export default Account