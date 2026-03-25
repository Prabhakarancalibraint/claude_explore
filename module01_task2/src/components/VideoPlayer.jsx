import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, X, ExternalLink } from 'lucide-react'

export default function VideoPlayer({ videos }) {
  const [selectedVideo, setSelectedVideo] = useState(null)

  if (!videos || videos.length === 0) return null

  // Extract YouTube video ID from various URL formats
  const getYouTubeId = (url) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ]
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  return (
    <motion.div
      className="video-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="video-header">
        <h3>📹 Video Resources</h3>
        <span className="video-count">{videos.length} video{videos.length > 1 ? 's' : ''}</span>
      </div>

      <div className="video-grid">
        {videos.map((video, index) => {
          const videoId = getYouTubeId(video.url)

          return (
            <motion.div
              key={index}
              className="video-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedVideo({ ...video, videoId })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="video-thumbnail">
                {videoId ? (
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                    alt={video.title}
                  />
                ) : (
                  <div className="video-placeholder">📹</div>
                )}
                <div className="play-button">
                  <Play size={24} />
                </div>
              </div>
              <div className="video-info">
                <h4>{video.title}</h4>
                {video.description && <p>{video.description}</p>}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Video Modal */}
      {selectedVideo && selectedVideo.videoId && (
        <motion.div
          className="video-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            className="video-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-modal" onClick={() => setSelectedVideo(null)}>
              <X size={24} />
            </button>
            <h3>{selectedVideo.title}</h3>
            <div className="video-embed">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {selectedVideo.description && (
              <p className="video-description">{selectedVideo.description}</p>
            )}
            <a
              href={selectedVideo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="open-external"
            >
              <ExternalLink size={16} />
              Open on YouTube
            </a>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}