import React from 'react'
import { BiSearchAlt2 } from 'react-icons/bi'

function Search() {

    // const handleInput = () => {

    // }

    const handleSearch = (e:React.SyntheticEvent) => {
        e.preventDefault()
        console.log('search ' + e.target.searchInput.value)
    }

  return (
    <>
        <form onSubmit={handleSearch} className='flex flex-col w-full items-center p-3 gap-2 border-2 rounded-md'>
            <input 
                className='w-full outline-none placeholder-gray-500 border-b-2 border-green-300 focus:border-green-500 text-center p-1 duration-150'
                type="search" 
                name='searchInput'
                placeholder='Search for produce' 
                required
                //onChange={handleInput}
            />
            <button 
                title='search'
                className='text-sm w-28 bg-gray-300 hover:bg-gray-400 p-1 rounded-md cursor-pointer duration-150' 
                type='submit'>
                    <div className='flex gap-1 items-center justify-center'>
                        <p className='text-base'><BiSearchAlt2 /></p>
                        <p className='text-base'>Search</p>          
                    </div>
            </button>
        </form>
    </>
  )
}

export default Search