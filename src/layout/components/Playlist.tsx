import { MusicNoteOutlined, PlayArrow } from '@mui/icons-material';
import type { SimplifiedPlaylist } from '../../models/playlist';
import styles from './Playlist.module.css'

interface PlaylistProps {
  playlists: SimplifiedPlaylist[]
}

const Playlist = ({ playlists }: PlaylistProps) => {
  return (
    <div className={styles.playlistGrid}>
      {playlists.map((playlist) => {
        const hasImage = playlist.images && playlist.images.length > 0;
        
        return (
          <div key={playlist.id} className={styles.playlistCard}>
            <div className={styles.playlistImage}>
              {hasImage ? (
                <img 
                  src={playlist.images[0].url} 
                  alt={playlist.name}
                />
              ) : (
                <MusicNoteOutlined 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    color: '#1ed760' 
                  }} 
                />
              )}
              <PlayArrow className={styles.playlistPlayIcon} />
            </div>
            <div className={styles.playlistInfo}>
              <h3>{playlist.name}</h3>
              <p>Playlist<b> · </b>{playlist.owner?.display_name || 'Unknown'}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Playlist;