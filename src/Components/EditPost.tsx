import React, { useState } from 'react'
import { AiOutlineEdit, AiOutlineCloseCircle } from 'react-icons/ai'
import { supabase } from '../supabase-config'

interface EditPostProps {
  id: string;
  name:string;
  itemName: string;
  caption: string;
  imgUrl: string;
  location: string;
  quantity: number;
  price: number;
  setChecker: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditPost:React.FC<EditPostProps> = ({ 
  id,
  name,
  itemName,
  caption,
  imgUrl,
  location,
  quantity,
  price,
  setChecker
 }) => {

  const [editModal, setEditModal] = useState<boolean>(false)
  const [successEdit, setSuccessEdit] = useState<boolean>(false)

  return (
    <>
      { 
        editModal 
        && 
        <EditPostModal 
          id={id}
          name={name}
          itemName={itemName}
          caption={caption}
          imgUrl={imgUrl}
          location={location}
          quantity={quantity}
          price={price}
          setEditModal={setEditModal}
          setSuccessEdit={setSuccessEdit} /> 
      }
      { successEdit && <SuccessEditPost setChecker={setChecker} setSuccessEdit={setSuccessEdit} /> }
      <button className='rounded-md bg-purple-400 hover:bg-purple-500 text-white duration-150' onClick={() => setEditModal(true)} title='editPost' type='button'>
          <p className='text-2xl p-3'>
            <AiOutlineEdit />
          </p>
      </button>
    </>
  )
}

interface EditModalProps {
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  name: string;
  itemName: string;
  caption: string;
  imgUrl: string;
  location: string;
  price: number;
  quantity: number;
  setSuccessEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditPostModal:React.FC<EditModalProps> = ({ 
  setSuccessEdit,
  setEditModal,
  id,
  name,
  itemName,
  caption,
  imgUrl,
  location,
  price,
  quantity
}) => {

  const [newItemName, setNewItemName] = useState<string>(itemName)
  const [newCaption, setNewCaption] = useState<string>(caption)
  const [imageDetails, setImageDetails] = useState<File | any>() // this can get image.name for file location
  const [newLocation, setNewLocation] = useState<string>(location)
  const [newQuantity, setNewQuantity] = useState<number>(quantity)
  //const [newImageUrl, setNewImageUrl] = useState<string>('')
  const [newPrice, setNewPrice] = useState<number>(price)

  const [loading, setLoading] = useState<boolean>(false)

  const submitEditPost = async (e:React.SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    //const urlParts = imgUrl.split('/');
    //const imageName = urlParts.pop();
    //console.log(imageName)

    //await removeImage(imageName)

    //await updateImage(imageName)
    if(imageDetails != null){
      await uploadNewImage()
      // get the url of the image
      const { data:publicURL } = supabase.storage.from('postImages').getPublicUrl(`${name}/${imageDetails.name}`) // ${name}/${imageName}
      await updatePost(publicURL.publicUrl) // updates the post
      //console.log("new url: ", publicURL.publicUrl)
    } else {
      await updatePost(imgUrl) // updates the post
    }

    // handle modals
    setLoading(false)
    setEditModal(false)
    setSuccessEdit(true)
  }

  const updatePost = async (imageUrl: string) => {
    if(id) {
      const { error } = await supabase
      .from('posts')
      .update({ 
        itemName: newItemName,
        caption: newCaption,
        location: newLocation,
        price: newPrice,
        quantity: newQuantity,
        imgUrl: imageUrl //publicURL.publicUrl //(new url most be here)
      })
      .eq('id', id)
      error && console.error(error)
    }
    //console.log('edit done')
  }

  // const removeImage = async (prevImage: string | undefined) => {
  //   const { data, error } = await supabase
  //   .storage
  //   .from('postImages')
  //   .remove([`${name}/${prevImage}`])
  //   if(data){
  //     console.log("removed image: ", data)
  //   }
  //   error && console.error(error)
  // }
  
  const uploadNewImage = async () => {
    const { data, error } = await supabase
      .storage
      .from('postImages')
      .upload(`${name}/${imageDetails.name}`, imageDetails, {
        cacheControl: '3600',
        upsert: false
      })
      if(data){
        return
        //console.log("updated image: ", data)
      }
      error && console.error(error)
  }
  

  /*const updateImage = async (imageName:string | undefined) => {
    const { data, error } = await supabase
    .storage
    .from('postImages')
    .update(`${name}/${imageName}`, imageDetails, {
      cacheControl: '0',
      upsert: true
    })
    if(data) {
      console.log("update image data: " , data)
      //setNewPath(data.path)
    }
    error && console.error(error)
  }*/

  return(
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
      <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md  overflow-y-auto overflow-x-hidden max-h-full'>
          <div className='flex flex-row w-full justify-center relative'>
              <h1 className='text-3xl text-green-400 font-bold'>Edit your post</h1>
              <button className='absolute top-1 right-0 hover:bg-gray-400 rounded-full duration-150' title='close btn' type='button' onClick={() => {setEditModal(false)}}>
                  <p className='text-3xl p-1'>
                      <AiOutlineCloseCircle />
                  </p>
              </button>
          </div>
          <form className='flex flex-col items-center gap-3 p-3' onSubmit={submitEditPost}>
              <div className='flex flex-col items-center'>
                <label className='font-semibold' htmlFor="itemName">Item name:</label>
                <input 
                  className='outline-none font-semibold text-gray-400 border-2 p-1 text-center rounded-md focus:border-green-400'
                  type="text" 
                  id='itemName' 
                  name='itemName'
                  placeholder={itemName}
                  //value={itemName}
                  onChange={e => setNewItemName(e.target.value)} />
              </div>
              <div className='flex flex-col items-center'>
                <label className='font-semibold' htmlFor="caption">Caption:</label>
                  <textarea 
                    className='outline-none font-semibold text-center border-2 p-1 rounded-md placeholder-gray-400 focus:border-green-400' 
                    placeholder={caption} 
                    name="caption" 
                    id="caption" 
                    cols={50} 
                    rows={3}
                    //value={caption}
                    onChange={(e) => { setNewCaption(e.target.value) }}>
                  </textarea>
              </div>
              <div className='flex flex-col items-center border-2 border-dashed p-3 rounded-md'>
                <label className='font-semibold' htmlFor="image">Image:</label>
                  <input 
                    className='outline-none focus:border-green-400' 
                    type="file"
                    accept='.jpg, .jpeg, .png, .gif' 
                    name="image" 
                    id="image"
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        const fileImage = e.target.files?.[0]
                        setImageDetails(fileImage)
                    }} />
              </div>
              <div className='flex flex-col items-center'>
                <label className='font-semibold' htmlFor="location">Location:</label>
                  <input 
                    className='outline-none font-semibold text-gray-600 border-2 p-1 text-center rounded-md focus:border-green-400' 
                    placeholder={location} 
                    type="text" 
                    name='location' 
                    id='location' 
                    //value={location}
                    onChange={(e) => { setNewLocation(e.target.value) }} />
              </div>
              <div className='flex gap-3'>
                <div className='flex flex-col items-center'>
                  <label className='font-semibold' htmlFor="quantity">Quantity:</label>
                    <input 
                      className='outline-none font-semibold text-blue-500 placeholder-blue-300 border-2 p-1 text-center rounded-md focus:border-green-400' 
                      placeholder={`${quantity}`} 
                      type="number" 
                      name='quantity' 
                      id='quantity' 
                      //value={price}
                      onChange={(e:any) => { setNewQuantity(e.target.value) }} />
                </div>
                <div className='flex flex-col items-center'>
                  <label className='font-semibold' htmlFor="price">Price:</label>
                    <input 
                      className='outline-none font-semibold text-red-500 placeholder-red-300 border-2 p-1 text-center rounded-md focus:border-green-400' 
                      placeholder={`${price}`} 
                      type="number" 
                      name='price' 
                      id='price' 
                      //value={price}
                      onChange={(e:any) => { setNewPrice(e.target.value) }} />
                </div>
              </div>  
              { loading && <h1 className='font-bold text-blue-500 text-xl animate-bounce'>Loading...</h1> }
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

interface SuccessEditProp {
  setSuccessEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setChecker: React.Dispatch<React.SetStateAction<boolean>>;
}

const SuccessEditPost:React.FC<SuccessEditProp> = ({ setSuccessEdit, setChecker }) => {

  const handleOnClose = () => {
    setChecker(true)
    setSuccessEdit(false)
  }
  
  return (
  <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
      <div className='flex flex-col items-center gap-5 p-5 bg-white shadow-2xl rounded-md'>
          <h1 className='font-bold text-3xl text-green-500'>Edited Successfully!</h1>
          <button className='cursor-pointer hover:bg-red-500 rounded-full duration-150' onClick={handleOnClose} title='close btn' type='button'>
              <p className='text-4xl p-1'>
                  <AiOutlineCloseCircle />
              </p>
          </button>
      </div>
  </div>
)
}

export default EditPost