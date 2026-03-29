import { motion } from 'framer-motion'
import { Clock, CheckCircle } from 'lucide-react'

export default function ExerciseCard({ title, difficulty, duration, description, isComplete }) {
  return (
    <motion.div
      className={`exercise-card ${isComplete ? 'completed' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {isComplete && (
        <div className="card-complete-badge">
          <CheckCircle size={16} /> Completed
        </div>
      )}
      <div className="exercise-card-header">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <span className={`difficulty-badge ${difficulty?.toLowerCase() || 'beginner'}`}>
          {difficulty}
        </span>
      </div>
      <div className="duration">
        <Clock size={16} />
        <span>{duration}</span>
      </div>
    </motion.div>
  )
}