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
  const { ref, inView } = useInView();
  const {data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage} = useGetCurrentUserPlaylists({limit:10, offset:0})
  const {data:user} = useGetCurrentUserProfile()
  useEffect(()=> {
    if(inView && hasNextPage && !isFetchingNextPage){
      fetchNextPage()
    }
  },[inView, fetchNextPage, hasNextPage, isFetchingNextPage])
  if (!user) return <EmptyPlaylist/>
  if (isLoading) return <LoadingSpinner/>
  if (error) return <ErrorMessage errorMessage={error.message}/>
  console.log("current user playlists: ", data)

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