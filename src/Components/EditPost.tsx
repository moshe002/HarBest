import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { supabase } from '../supabase-config'

function EditPost() {

    const editPost = async () => {
      // const { error } = await supabase
      // .from('countries')
      // .update({ name: 'Australia' })
      // .eq('id', 1)
      // error && console.error(error)
    }

  return (
    <>
        <button className='rounded-md bg-purple-400 hover:bg-purple-500 text-white duration-150' onClick={editPost} title='editPost' type='button'>
            <p className='text-2xl p-3'>
                <AiOutlineEdit />
            </p>
        </button>
    </>
  )
}

export default EditPost