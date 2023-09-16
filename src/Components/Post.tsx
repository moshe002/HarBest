import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { supabase } from '../supabase-config';

interface PostProps {
    setPost: React.Dispatch<React.SetStateAction<boolean>>;
}

const Post:React.FC<PostProps> = ({ setPost }) => {

    const [caption, setCaption] = useState<string>('')
    const [nameOfSeller, setNameOfSeller] = useState<string>('')
    const [emailOfSeller, setEmailOfSeller] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [price, setPrice] = useState<number>(0)

    const handlePost = async (e:React.SyntheticEvent) => {
        e.preventDefault()
        //console.log(price)
        // caption, image, nameOfSeller, emailOfSeller, location, price
        const { error } = await supabase
        .from('posts')
        .insert({ 
            caption: caption, 
            nameOfSeller: nameOfSeller,
            emailOfSeller: emailOfSeller,
            location: location,
            price: price
        })
        error && console.error(error) // prints the error
        console.log('submitted successfully')
    }

  return (
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-50'>
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
                    <label htmlFor="caption">Caption:</label>
                    <textarea 
                        className='outline-none text-center border-2 p-1 rounded-md placeholder-gray-400 focus:border-green-400' 
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
                    <label htmlFor="image">Image:</label>
                    <input 
                        className='outline-none focus:border-green-400' 
                        type="file" 
                        accept='.jpg, .jpeg, .png, .gif' 
                        name="image" 
                        id="image" 
                        required />
                </div>
                <div className='flex flex-col items-center'>
                    <label htmlFor="seller">Name of Seller:</label>
                    <input 
                        className='outline-none border-2 p-1 text-center rounded-md focus:border-green-400' 
                        placeholder='John Doe' 
                        type="text" 
                        name='seller' 
                        id='seller' 
                        value={nameOfSeller}
                        onChange={(e) => { setNameOfSeller(e.target.value) }}
                        required />
                </div>
                <div className='flex flex-col items-center'>
                    <label htmlFor="email">Email of Seller:</label>
                    <input 
                        className='outline-none border-2 p-1 text-center rounded-md focus:border-green-400' 
                        placeholder='john@gmail.com' 
                        type="email" 
                        name='email' 
                        id='email' 
                        value={emailOfSeller}
                        onChange={(e) => { setEmailOfSeller(e.target.value) }}
                        required />
                </div>
                <div className='flex flex-col items-center'>
                    <label htmlFor="location">Location:</label>
                    <input 
                        className='outline-none border-2 p-1 text-center rounded-md focus:border-green-400' 
                        placeholder='Cebu City' 
                        type="text" 
                        name='location' 
                        id='location' 
                        value={location}
                        onChange={(e) => { setLocation(e.target.value) }}
                        required />
                </div>
                <div className='flex flex-col items-center'>
                    <label htmlFor="price">Price:</label>
                    <input 
                        className='outline-none border-2 p-1 text-center rounded-md focus:border-green-400' 
                        placeholder='10000' 
                        type="number" 
                        name='price' 
                        id='price' 
                        value={price}
                        onChange={(e:React.SyntheticEvent) => { setPrice(e.target.value) }}
                        required />
                </div>
                <button
                    className='font-semibold p-3 rounded-md bg-green-400 hover:bg-green-600 text-white duration-150' 
                    type='submit'>
                        Upload
                </button>
            </form>
        </div>
    </div>
  )
}

export default Post