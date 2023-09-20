import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase-config'

import BuyButton from './BuyButton'

interface PostProps {
  caption: string;
  emailOfSeller: string;
  location: string;
  nameOfSeller: string;
  price: number;
}

function Feed() {

  const [posts, setPosts] = useState<PostProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getAllPosts()
  }, [posts]) // so basically when 'posts' updates it also runs the useEffect

  const getAllPosts = async () => {   
    const { data, error } = await supabase
    .from('posts')
    .select()
    if(data) {
      //console.log(data)
      setPosts(data.reverse())
    } 
    error && console.log(error)
    setLoading(false) 
    // this block of code gets bucket files (for images)
    //const { data, error } = await supabase
    //.storage
    //.getBucket('avatars')
  }

  return (
    <>
      <div className='flex flex-col gap-5 p-3 w-2/6 overflow-y-auto'>
        { loading && <h1 className='text-center text-3xl text-gray-400 mt-10 font-bold'>Loading...</h1> }
          {
            posts.map((data, index) => {
              return (
                <div 
                  className='flex flex-col items-center gap-3 text-center shadow-xl border-2 p-5 rounded-md' 
                  key={index}>
                    <h1 className='font-semibold'>{data.nameOfSeller}</h1>
                    <h1 className='text-base'>{data.caption}</h1>
                    <img src="" alt="image_of_item" />
                    <h1 className='font-bold'>Location: <i className='text-gray-400'>{data.location}</i></h1>
                    <h1 className='font-bold'>Price: <i className='text-gray-400'>{data.price}</i></h1>
                    <BuyButton />
                </div>
              )
            })
          }
      </div>
    </>
  )
}

export default Feed