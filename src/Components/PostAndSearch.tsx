import React from 'react'

import Search from './Search'
import PostButton from './PostButton'

interface UpdatePostProps {
  setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>;
  //setImageName: React.Dispatch<React.SetStateAction<File | any>>;
}

const PostAndSearch:React.FC<UpdatePostProps> = ({ setUpdatePost }) => {
  return (
    <>
      <div className='flex flex-col gap-5 items-center w-2/6 p-3'>
          <Search />
          <PostButton setUpdatePost={setUpdatePost} />
      </div>
    </>
  )
}

export default PostAndSearch