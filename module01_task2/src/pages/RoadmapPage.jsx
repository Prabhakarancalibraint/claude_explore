import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { topics } from '../data/blockchainData'

export default function RoadmapPage({ progress }) {
  const completedTopics = progress?.progress?.completedTopics || []

  return (
    <div className="roadmap-page">
      <div className="roadmap-hero">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Complete Blockchain Roadmap
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          14 comprehensive topics covering everything about blockchain. Start from the beginning or jump to any topic!
        </motion.p>
      </div>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="roadmap-grid">
          {topics.map((topic, index) => {
            const isCompleted = completedTopics.includes(topic.id)
            return (
              <Link
                to={`/topic/${topic.id}`}
                key={topic.id}
                className={`roadmap-card ${isCompleted ? 'completed' : ''}`}
                style={{ '--delay': `${index * 0.1}s` }}
              >
                {isCompleted && <span className="completed-badge">✓</span>}
                <div
                  className="card-icon"
                  style={{
                    background: `hsl(${(index * 30) % 360}, 70%, 60%)`
                  }}
                >
                  {topic.icon}
                </div>
                <h3>{topic.title}</h3>
                <p>{topic.subtitle}</p>
                {topic.sections && (
                  <span className="section-count">
                    {topic.sections.length} sections
                  </span>
                )}
                <span className="card-arrow">→</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}