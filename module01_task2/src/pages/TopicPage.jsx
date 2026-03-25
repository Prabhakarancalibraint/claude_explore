import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { roadmapData } from '../data/roadmapData'
import { Clock } from 'lucide-react'

function AnimatedSection({ children }) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className="topic-section"
    >
      {children}
    </motion.div>
  )
}

export default function TopicPage() {
  const { topicId } = useParams()
  const topic = roadmapData[topicId]

  if (!topic) {
    return (
      <div className="topic-page">
        <div className="topic-header">
          <h1>Topic Not Found</h1>
          <p>The topic you're looking for doesn't exist.</p>
          <Link to="/roadmap" className="btn-primary" style={{ marginTop: '2rem' }}>
            Back to Roadmap
          </Link>
        </div>
      </div>
    )
  }

  const topicKeys = Object.keys(roadmapData)
  const currentIndex = topicKeys.indexOf(topicId)
  const prevTopic = currentIndex > 0 ? topicKeys[currentIndex - 1] : null
  const nextTopic = currentIndex < topicKeys.length - 1 ? topicKeys[currentIndex + 1] : null

  return (
    <div className="topic-page">
      <div className="topic-header">
        <motion.span
          className="badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Module {currentIndex + 1}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {topic.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {topic.description}
        </motion.p>
      </div>

      <div className="topic-content">
        {topic.sections.map((section, index) => (
          <AnimatedSection key={index}>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </AnimatedSection>
        ))}

        {topic.exercises && (
          <AnimatedSection>
            <div className="exercise-box">
              <h3>💪 Practice Exercise</h3>
              {topic.exercises.map((exercise, index) => (
                <div key={index}>
                  <h4 style={{ margin: '1rem 0 0.5rem' }}>{exercise.title}</h4>
                  <ul>
                    {exercise.tasks.map((task, taskIndex) => (
                      <li key={taskIndex}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}

        <div className="topic-nav">
          {prevTopic ? (
            <Link to={`/topic/${prevTopic}`}>
              ← Previous: {roadmapData[prevTopic].title}
            </Link>
          ) : (
            <span />
          )}
          {nextTopic ? (
            <Link to={`/topic/${nextTopic}`}>
              Next: {roadmapData[nextTopic].title} →
            </Link>
          ) : (
            <Link to="/exercises">
              View Exercises →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}