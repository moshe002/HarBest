import React, { useState } from 'react'
import { AiOutlineDelete, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { supabase } from '../supabase-config'

interface DeleteProps {
    id: string;
    setChecker: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeletePost:React.FC<DeleteProps> = ({ id, setChecker }) => {

    const [postDelete, setPostDelete] = useState<boolean>(false)
    const [doneDelete, setDoneDelete] = useState<boolean>(false)

    const deletePost = async () => {
        if(id){
            setPostDelete(false)
            setDoneDelete(true)
            const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id)

            error && console.error(error)
            //console.log('Post Deleted!')
        }
    }

    const handleSuccessDelete = () => {
        setDoneDelete(false)
        setChecker(true)
    }

  return (
    <>
        { postDelete && <CheckDelete deletePost={deletePost} setPostDelete={setPostDelete} /> } 
        { doneDelete && <SuccessDelete handleSuccessDelete={handleSuccessDelete} /> }
        <button 
            className='rounded-md bg-red-400 hover:bg-red-500 text-white duration-150' 
            onClick={() => setPostDelete(true)} 
            title='deletePost' 
            type='button'>
                <p className='text-2xl p-3'>
                    <AiOutlineDelete />
                </p>
        </button>
    </>
  )
}

interface CheckDeleteProps {
    deletePost: () => void;
    setPostDelete: React.Dispatch<React.SetStateAction<boolean>>;
}
// component that will verify if user does want or does not want to delete his/her post
const CheckDelete:React.FC<CheckDeleteProps> = ({ deletePost, setPostDelete }) => {
    return(
        <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
            <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
                <h1 className='text-3xl font-semibold text-green-500'>Do you want to delete the post?</h1>
                <div className='flex flex-row gap-5'>
                    <button onClick={deletePost} title='yes please uwu' type='button'>
                        <p className='text-5xl p-1 rounded-full hover:bg-green-500 duration-150'>
                            <AiOutlineCheckCircle />
                        </p>
                    </button>
                    <button onClick={() => setPostDelete(false)} title='no lol' type='button'>
                        <p className='text-5xl  p-1 rounded-full hover:bg-red-500 duration-150'>
                            <AiOutlineCloseCircle />
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
}

interface DoneDelete {
    // do research on the difference between type and inteface (typescript)
    handleSuccessDelete: () => void;
}
// successful delete modal component
const SuccessDelete:React.FC<DoneDelete> = ({ handleSuccessDelete }) => {
    return (
        <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
            <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
                <h1 className='text-4xl text-green-500 font-semibold'>Deleted Successfully!</h1>
                <button onClick={handleSuccessDelete} title='close me pls' type='button'>
                    <p className='text-5xl  p-1 rounded-full hover:bg-red-500 duration-150'>
                        <AiOutlineCloseCircle />
                    </p>
                </button>
            </div>
        </div>
    )
}

export default DeletePost