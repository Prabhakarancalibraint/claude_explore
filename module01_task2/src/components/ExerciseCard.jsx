import { motion } from 'framer-motion'
import { Clock, ChevronRight } from 'lucide-react'

export default function ExerciseCard({ title, difficulty, duration, description }) {
  return (
    <motion.div
      className="exercise-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="exercise-card-header">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <span className={`difficulty-badge ${difficulty.toLowerCase()}`}>
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