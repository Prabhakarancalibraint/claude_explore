import { motion } from 'framer-motion'
import { Clock, BarChart, ArrowRight } from 'lucide-react'
import { exercisesList } from '../data/roadmapData'

export default function ExercisePage() {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return '#10b981'
      case 'intermediate':
        return '#f59e0b'
      case 'advanced':
        return '#ef4444'
      default:
        return '#6366f1'
    }
  }

  return (
    <div className="exercises-page">
      <div className="exercises-header">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Practice Exercises
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Apply what you've learned with hands-on challenges
        </motion.p>
      </div>

      <div className="exercises-list">
        {exercisesList.map((exercise, index) => (
          <motion.div
            key={exercise.id}
            className="exercise-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="exercise-item-header">
              <div>
                <h3>{exercise.title}</h3>
                <p>{exercise.description}</p>
              </div>
              <span
                className="difficulty-badge"
                style={{
                  background: `${getDifficultyColor(exercise.difficulty)}20`,
                  color: getDifficultyColor(exercise.difficulty)
                }}
              >
                {exercise.difficulty}
              </span>
            </div>
            <div className="exercise-meta">
              <span>
                <Clock size={16} />
                {exercise.duration}
              </span>
              <span>
                <BarChart size={16} />
                {exercise.topics.length} topics
              </span>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Tasks:
              </h4>
              <ul style={{ display: 'grid', gap: '0.5rem' }}>
                {exercise.tasks.map((task, taskIndex) => (
                  <li
                    key={taskIndex}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.9rem'
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        flexShrink: 0
                      }}
                    />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}