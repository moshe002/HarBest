import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { supabase } from '../supabase-config';

import SuccessPost from './SuccessPost'

interface PostProps {
    setPost: React.Dispatch<React.SetStateAction<boolean>>;
    setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>;
    //setImageName: React.Dispatch<React.SetStateAction<File | any>>;
}

const Post:React.FC<PostProps> = ({ setPost, setUpdatePost }) => {

    const [caption, setCaption] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [quantity, setQuantity] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)
    //const [imageUrl, setImageUrl] = useState<string>('')
    const [image, setImage] = useState<File | any>()

    const [successPost, setSuccessPost] = useState<boolean>(false)

    const handlePost = async (e:React.SyntheticEvent) => {
        e.preventDefault()
        // caption, image, location, price, image url from storage
        const { data: { user } } = await supabase.auth.getUser()
        let username:string = user?.user_metadata.username
        let email:string | undefined = user?.email
        await postItems(username, email)
        setUpdatePost(true)
    }

    const postItems = async (username:string, email: string | undefined ) => {
        //console.log('postItems')
        await uploadImage(username)
        const { data:publicURL } = supabase.storage.from('postImages').getPublicUrl(`${username}/${image.name}`)
        const { error } = await supabase
        .from('posts')
        .insert({ 
            caption: caption, 
            nameOfSeller: username,
            emailOfSeller: email,
            location: location,
            quantity: quantity,
            price: price,
            imgUrl: publicURL.publicUrl
        })
        error && console.error(error) // prints the error
        setSuccessPost(true)
    }

    const uploadImage = async (username:string) => {    
        //console.log('uploadImage')  
        const { data, error } = await supabase
        .storage
        .from('postImages')
        .upload(`${username}/${image?.name}`, image, {
            cacheControl: '3600',
            upsert: false
        })
        if(data){
            //console.log(data)
            console.log('image uploaded')
            //await getImageUrl(username)
            //console.log(imageUrl)
        }
        error && console.error(error)
    }

  return (
    <>
        { 
            successPost ? <SuccessPost 
                setSuccessPost={setSuccessPost}
                setPost={setPost} /> 
        :
            <>  
                <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
                    <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md  overflow-y-auto overflow-x-hidden max-h-full'>
                        <div className='flex flex-row w-full justify-center relative'>
                            <h1 className='text-3xl text-green-400 font-bold'>Sell your produce!</h1>
                            <button className='absolute top-1 right-0 hover:bg-gray-400 rounded-full duration-150' title='close btn' type='button' onClick={() => {setPost(false)}}>
                                <p className='text-3xl p-1'>
                                    <AiOutlineCloseCircle />
                                </p>
                            </button>
                        </div>
                        <form className='flex flex-col items-center gap-3 p-3' onSubmit={handlePost}>
                            <div className='flex flex-col items-center'>
                                <label className='font-semibold' htmlFor="caption">Caption:</label>
                                <textarea 
                                    className='outline-none font-semibold text-center border-2 p-1 rounded-md placeholder-gray-400 focus:border-green-400' 
                                    placeholder='Write your caption here...' 
                                    name="caption" 
                                    id="caption" 
                                    cols={50} 
                                    rows={3}
                                    value={caption}
                                    onChange={(e) => { setCaption(e.target.value) }}
                                    required>
                                </textarea>
                            </div>
                            <div className='flex flex-col items-center border-2 border-dashed p-3 rounded-md'>
                                <label className='font-semibold' htmlFor="image">Image:</label>
                                <input 
                                    className='outline-none' 
                                    type="file"
                                    accept='.jpg, .jpeg, .png, .gif' 
                                    name="image" 
                                    id="image"
                                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                        const fileImage = e.target.files?.[0]
                                        setImage(fileImage)
                                    }} 
                                    required />
                            </div>
                            <div className='flex flex-col items-center'>
                                <label className='font-semibold' htmlFor="location">Location:</label>
                                <input 
                                    className='outline-none font-semibold text-gray-600 border-2 p-1 text-center rounded-md focus:border-green-400' 
                                    placeholder='Cebu City' 
                                    type="text" 
                                    name='location' 
                                    id='location' 
                                    value={location}
                                    onChange={(e) => { setLocation(e.target.value) }}
                                    required />
                            </div>
                            <div className='flex gap-3'>
                                <div className='flex flex-col items-center'>
                                    <label className='font-semibold' htmlFor="quantity">Quantity:</label>
                                    <input 
                                        className='outline-none font-semibold text-blue-500 border-2 p-1 text-center rounded-md focus:border-green-400' 
                                        placeholder='10000' 
                                        type="number" 
                                        name='quantity' 
                                        id='quantity' 
                                        value={quantity}
                                        onChange={(e:any) => { setQuantity(e.target.value) }}
                                        required />
                                </div>
                                <div className='flex flex-col items-center'>
                                    <label className='font-semibold' htmlFor="price">Price:</label>
                                    <input 
                                        className='outline-none font-semibold text-red-500 border-2 p-1 text-center rounded-md focus:border-green-400' 
                                        placeholder='10000' 
                                        type="number" 
                                        name='price' 
                                        id='price' 
                                        value={price}
                                        onChange={(e:any) => { setPrice(e.target.value) }}
                                        required />
                                </div>
                            </div>
                            <button
                                className='font-semibold p-3 rounded-md bg-green-400 hover:bg-green-600 text-white duration-150' 
                                type='submit'>
                                    Upload
                            </button>
                        </form>
                    </div>
                </div>
            </>
        }
    </>
  )
}

export default Post