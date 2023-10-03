import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase-config'

import BuyButton from './BuyButton'

interface PostProps {
  caption: string;
  emailOfSeller: string;
  location: string;
  nameOfSeller: string;
  price: number;
  imgUrl: string;
}

interface UpdatePostProps {
  updatePost: boolean;
}

const Feed:React.FC<UpdatePostProps> = ({ updatePost }) => {

  const [posts, setPosts] = useState<PostProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  //const [imgData, setImgData] = useState<any[]>([])

  useEffect(() => {
    getAllPosts()
  }, [updatePost]) // so basically when 'updatePost' updates it also runs the useEffect

  const getAllPosts = async () => {  
    const { data, error } = await supabase.from('posts').select()
    if(data) {
      setPosts(data.reverse())
    } 
    error && console.log(error)
    setLoading(false) 
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
                    <h1 className='font-bold text-green-500 text-xl'>{data.nameOfSeller}</h1>
                    <h1 className='text-base'>{data.caption}</h1>
                    <img 
                      className='rounded-md w-52 h-40'
                      src={`${data.imgUrl}`} 
                      alt="image_of_item" />
                    <h1 className='font-bold'>Location: <i className='text-gray-400'>{data.location}</i></h1>
                    <h1 className='font-bold'>Price: <b className='text-red-400'>{data.price}</b></h1>
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