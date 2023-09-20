import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { supabase } from '../supabase-config'

interface DeleteProps {
    index: number;
}

const DeletePost:React.FC<DeleteProps> = ({ index }) => {

    const deletePost = async () => {
        console.log('delete: ' + ' index: ' + index)
            // console.log(index)
            // const { error } = await supabase
            // .from('posts')
            // .delete()
            // .eq('emailOfSeller', email)

            // error && console.error(error)
            // alert('Post Deleted!')
    }

  return (
    <>
        <button 
            className='rounded-md bg-red-400 hover:bg-red-500 text-white duration-150' 
            onClick={deletePost} 
            title='deletePost' 
            type='button'>
                <p className='text-2xl p-3'>
                    <AiOutlineDelete />
                </p>
        </button>
    </>
  )
}

export default DeletePost