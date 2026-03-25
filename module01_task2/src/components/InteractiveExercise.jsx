import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

export default function InteractiveExercise({ exercise, tasks, completedTasks, onTaskComplete }) {
  const [expanded, setExpanded] = useState(true);
  const [showHint, setShowHint] = useState(null);

  const completedCount = completedTasks ? completedTasks.filter(t => t).length : 0;
  const totalTasks = tasks ? tasks.length : 0;
  const progressPercent = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  return (
    <motion.div
      className="exercise-interactive"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="exercise-header" onClick={() => setExpanded(!expanded)}>
        <div className="exercise-title">
          <span className="exercise-icon">💪</span>
          <h3>Practice Exercise</h3>
        </div>
        <div className="exercise-meta">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="progress-text">{completedCount}/{totalTasks}</span>
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {expanded && tasks && (
        <div className="exercise-tasks">
          {tasks.map((task, index) => {
            const isCompleted = completedTasks && completedTasks.includes(task.id);

            return (
              <motion.div
                key={task.id}
                className={`task-item ${isCompleted ? 'completed' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  className="task-checkbox"
                  onClick={() => onTaskComplete(exercise.id, task.id)}
                >
                  {isCompleted ? (
                    <CheckCircle size={22} className="checked" />
                  ) : (
                    <Circle size={22} className="unchecked" />
                  )}
                </button>

                <div className="task-content">
                  <span className="task-text">{task.text}</span>
                  <button
                    className="hint-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowHint(showHint === index ? null : index);
                    }}
                  >
                    <Lightbulb size={16} />
                    Need a hint?
                  </button>

                  {showHint === index && task.hint && (
                    <motion.div
                      className="hint-box"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <span>💡 {task.hint}</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}

          {progressPercent === 100 && (
            <motion.div
              className="completion-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              🎉 Exercise Complete! Great job!
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
}