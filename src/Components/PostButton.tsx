import React, { useState } from 'react'
import { HiOutlinePencilAlt } from 'react-icons/hi'

import Post from './Post'

interface UpdatePostProps {
  setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>;
  //setImageName: React.Dispatch<React.SetStateAction<File | any>>;
}

const PostButton:React.FC<UpdatePostProps> = ({ setUpdatePost }) => {

  const [post, setPost] = useState<boolean>(false)
  
  return (
    <>
      { post && <Post setPost={setPost} setUpdatePost={setUpdatePost} /> }
      <button
        onClick={() => setPost(true)}
        title='post your product'
        className='text-white font-bold bg-green-500 hover:bg-green-600 p-3 rounded-md duration-150' 
        type='button'>
            <div className='flex gap-1 items-center justify-center'>
                <p className='text-xl'><HiOutlinePencilAlt /></p>
                <p className='text-xl'>POST</p>          
            </div>
      </button>
    </>
  )
}

export default PostButton