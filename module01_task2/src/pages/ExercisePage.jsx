import { motion } from 'framer-motion'
import { Clock, CheckCircle } from 'lucide-react'
import { exercises } from '../data/blockchainData'
import useProgress from '../hooks/useProgress'

export default function ExercisePage({ progress }) {
  const { getExerciseProgress, completeExerciseTask } = useProgress()

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

  const handleTaskToggle = (exerciseId, taskId) => {
    completeExerciseTask(exerciseId, taskId)
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
          Apply what you've learned with hands-on challenges. Check off tasks as you complete them!
        </motion.p>
      </div>

      <div className="exercises-list">
        {exercises.map((exercise, index) => {
          const completedTasks = getExerciseProgress(exercise.id) || []
          const completedCount = completedTasks.length
          const totalTasks = exercise.tasks.length
          const progressPercent = (completedCount / totalTasks) * 100
          const isComplete = progressPercent === 100

          return (
            <motion.div
              key={exercise.id}
              className={`exercise-item ${isComplete ? 'complete' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {isComplete && (
                <div className="exercise-complete-badge">
                  <CheckCircle size={16} /> Completed
                </div>
              )}
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

              <div className="exercise-progress-bar">
                <div
                  className="exercise-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="exercise-progress-text">
                {completedCount}/{totalTasks} tasks completed
              </span>

              <div className="exercise-meta">
                <span>
                  <Clock size={16} />
                  {exercise.duration}
                </span>
              </div>

              <div className="exercise-tasks-list">
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Tasks:
                </h4>
                {exercise.tasks.map((task) => {
                  const isTaskCompleted = completedTasks.includes(task.id)
                  return (
                    <div
                      key={task.id}
                      className={`task-row ${isTaskCompleted ? 'completed' : ''}`}
                      onClick={() => handleTaskToggle(exercise.id, task.id)}
                    >
                      <div className={`task-checkbox ${isTaskCompleted ? 'checked' : ''}`}>
                        {isTaskCompleted && <CheckCircle size={16} />}
                      </div>
                      <span className="task-text">{task.text}</span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}