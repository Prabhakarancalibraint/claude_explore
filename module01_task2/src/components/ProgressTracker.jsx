import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Trophy } from 'lucide-react';

export default function ProgressTracker({ progress, topics }) {
  const completedTopics = progress.completedTopics?.length || 0;
  const totalTopics = topics.length;

  const completedQuizzes = Object.values(progress.completedQuizzes || {}).filter(q => q.completed).length;

  const completedExercises = Object.keys(progress.completedExercises || {}).length;

  const totalExercises = 10; // Based on our exercises list

  const overallProgress = ((completedTopics / totalTopics) * 40 +
    (completedQuizzes / totalTopics) * 30 +
    (completedExercises / totalExercises) * 30);

  return (
    <motion.div
      className="progress-tracker"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="progress-stats">
        <div className="stat-item">
          <BookOpen size={20} />
          <div className="stat-info">
            <span className="stat-value">{completedTopics}/{totalTopics}</span>
            <span className="stat-label">Topics</span>
          </div>
        </div>

        <div className="stat-item">
          <Trophy size={20} />
          <div className="stat-info">
            <span className="stat-value">{completedQuizzes}/{totalTopics}</span>
            <span className="stat-label">Quizzes</span>
          </div>
        </div>

        <div className="stat-item">
          <CheckCircle size={20} />
          <div className="stat-info">
            <span className="stat-value">{completedExercises}/{totalExercises}</span>
            <span className="stat-label">Exercises</span>
          </div>
        </div>
      </div>

      <div className="progress-overall">
        <div className="progress-bar-large">
          <motion.div
            className="progress-fill-large"
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <span className="overall-percentage">{overallProgress.toFixed(0)}% Complete</span>
      </div>

      {overallProgress >= 100 && (
        <motion.div
          className="certificate-badge"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          🎓 Blockchain Master Certified!
        </motion.div>
      )}
    </motion.div>
  );
}