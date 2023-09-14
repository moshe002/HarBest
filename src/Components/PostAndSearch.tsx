import React from 'react'

import Search from './Search'
import Post from './PostButton'

function PostAndSearch() {
  return (
    <div className='flex flex-col gap-5 items-center w-2/6 p-3'>
        <Search />
        <Post />
    </div>
  )
}

export default PostAndSearch