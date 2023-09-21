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

interface UpdatePostProps {
  updatePost: boolean;
}

const Feed:React.FC<UpdatePostProps> = ({ updatePost }) => {

  const [posts, setPosts] = useState<PostProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [username, setUsername] = useState<string>('')
  //const [imageUrl, setImageUrl] = useState<string>('')
  const [filesInBucket, setFilesInBucket] = useState<any[]>([])
  const [imgName, setImgName] = useState<string>('')

  //console.log()
  //console.log(imageName)
  //console.log(username)

  useEffect(() => {
    getAllPosts()
  }, [updatePost]) // so basically when 'updatePost' updates it also runs the useEffect

  const getAllPosts = async () => {  
    getFilesInBucket()
    await getUser()
    const { data, error } = await supabase.from('posts').select()
    if(data) {
      //console.log(data)
      setPosts(data.reverse())
    } 
    error && console.log(error)
    setLoading(false) 
  }

  // const getImageUrl = () => { // gets the url of the image for src    
  //   const { data } = supabase
  //   .storage
  //   .from('postImages')
  //   .getPublicUrl(`${username}/${imageName}`)
  //   if(data) {
  //     //console.log(data.publicUrl)
  //     setImageUrl(data.publicUrl)
  //   }
  // }

  const getFilesInBucket = async () => {  
    //let folderName:string = `${username}/`  
    const { data, error } = await supabase
    .storage
    .from('postImages')
    .list(username, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
      //search: imageName // name of file here 
    })
    if(data){
      //console.log(data)
      setFilesInBucket(data)
    } 
    error && console.error(error)
    setImgName(filesInBucket[0]?.name)
  }

  const getUser = async () => { // get username
    const { data: { user } } = await supabase.auth.getUser()
    let username:string = user?.user_metadata.username
    setUsername(username)
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
                    <img 
                      className='rounded-md'
                      src={`https://gpuntfkmyoteglavnzsu.supabase.co/storage/v1/object/public/postImages/darlene/emptyMap.png`} 
                      alt="image_of_item" />
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