import ErrorMessage from '../../common/components/ErrorMessage'
import LoadingSpinner from '../../common/components/LoadingSpinner'
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists'
import EmptyPlaylist from './EmptyPlaylist'
import Playlist from './Playlist'
import styles from './Library.module.css'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

const Library = () => {  
  const {data:user} = useGetCurrentUserProfile()  
  const { ref, inView } = useInView({rootMargin: '0px 0px 500px 0px', threshold: 0});
  const {data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage} = useGetCurrentUserPlaylists({limit:10, offset:0})
  
  useEffect(()=> {    
    if(inView && hasNextPage && !isFetchingNextPage){
      fetchNextPage()
    }
  // },[inView, fetchNextPage, hasNextPage, isFetchingNextPage])
  },[inView, hasNextPage, isFetchingNextPage]) 

  if (!user) return <EmptyPlaylist/>
  if (isLoading) return <LoadingSpinner/>
  if (error) return <ErrorMessage errorMessage={error.message}/>   

  const playlists = data?.pages.flatMap(page => page.items) || []
  return (
    <div className={styles.library}>
      <h2 style={{paddingLeft: 8}}>Playlist ({data?.pages[0]?.total || 0})</h2>
      {playlists.length === 0 ? (<EmptyPlaylist/>) : (
        <>
          <Playlist playlists={playlists} />
          <div ref={ref}>{isFetchingNextPage && <LoadingSpinner/>}</div>      
        </>
      )}      
    </div>    
  )
}

export default Library