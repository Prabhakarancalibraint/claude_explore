import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { roadmapData } from '../data/roadmapData'

export default function RoadmapPage() {
  const topics = Object.entries(roadmapData).map(([id, data]) => ({
    id,
    ...data
  }))

  return (
    <div className="roadmap-page">
      <div className="roadmap-hero">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Blockchain Developer Roadmap
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Follow this comprehensive path from basics to advanced blockchain development
        </motion.p>
      </div>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="roadmap-grid">
          {topics.map((topic, index) => (
            <Link to={`/topic/${topic.id}`} key={topic.id} className="roadmap-card" style={{ '--delay': `${index * 0.1}s` }}>
              <div className="card-icon" style={{ background: `hsl(${(index * 45) % 360}, 70%, 60%)` }}>
                {index + 1}
              </div>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <span className="card-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}