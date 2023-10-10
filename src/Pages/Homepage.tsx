import { useState } from 'react' // add useEffect on displaying session
//import { supabase } from '../supabase-config'

import Header from '../Components/Header'
import Feed from '../Components/Feed'
import PostAndSearch from '../Components/PostAndSearch'
import LogoutAndAccountContainer from '../Components/LogoutAndAccountContainer'

function Homepage() {

  const [updatePost, setUpdatePost] = useState<boolean>(false)

  // useEffect(() => {
  //   getSession()
  // }, [])

  // const getSession = async () => {
  //   const { data, error } = await supabase.auth.getSession()  
  //   if(data) {
  //     console.log(data)
  //   }
  //   error && console.error(error)
  // }

  return (
    <div className='flex flex-col h-screen w-full'>
      <Header />
        <div className='flex flex-row h-screen w-full overflow-hidden'>
          <PostAndSearch setUpdatePost={setUpdatePost} />
          <Feed updatePost={updatePost} />
          <LogoutAndAccountContainer />
        </div>
    </div>
  )
}

export default Homepage