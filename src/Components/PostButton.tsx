import React, { useState } from 'react'
import { HiOutlinePencilAlt } from 'react-icons/hi'

import Post from './Post'

function PostButton() {

  const [post, setPost] = useState<boolean>(false)

  const handlePost = () => {
    setPost(true)
  }
  
  return (
    <>
      { post && <Post setPost={setPost} /> }
      <button
        onClick={handlePost}
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