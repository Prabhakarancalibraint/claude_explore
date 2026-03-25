import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { topics } from '../data/blockchainData'
import InteractiveExercise from '../components/InteractiveExercise'
import Quiz from '../components/Quiz'
import CodeBlock from '../components/CodeBlock'
import useProgress from '../hooks/useProgress'

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

export default function TopicPage({ progress: progressHook }) {
  const { topicId } = useParams()
  const { completeTopic, completeExerciseTask, completeQuiz, getExerciseProgress, getTopicProgress } = useProgress()

  const topic = topics.find(t => t.id === topicId)

  useEffect(() => {
    if (topic) {
      completeTopic(topicId)
    }
  }, [topicId])

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

  const currentIndex = topics.findIndex(t => t.id === topicId)
  const prevTopic = currentIndex > 0 ? topics[currentIndex - 1] : null
  const nextTopic = currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null

  const topicProgress = getTopicProgress(topicId)
  const completedTasks = topic.exercises?.[0]?.tasks?.map(t => t.id) || []
  const exerciseProgress = getExerciseProgress(topic.id)

  const handleTaskComplete = (exerciseId, taskId) => {
    completeExerciseTask(exerciseId, taskId)
  }

  const handleQuizComplete = (topicId, score) => {
    completeQuiz(topicId, score)
  }

  return (
    <div className="topic-page">
      <div className="topic-header">
        <motion.span
          className="badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Module {currentIndex + 1} of {topics.length}
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
          {topic.subtitle}
        </motion.p>
        {topicProgress.completed && (
          <motion.span
            className="completed-badge-large"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            ✓ Completed
          </motion.span>
        )}
      </div>

      <div className="topic-content">
        {topic.sections && topic.sections.map((section, index) => (
          <AnimatedSection key={index}>
            <h2>{section.title}</h2>
            {section.content.split('\n\n').map((paragraph, pIndex) => (
              <p key={pIndex}>{paragraph}</p>
            ))}
            {section.code && <CodeBlock code={section.code} />}
          </AnimatedSection>
        ))}

        {topic.quiz && topic.quiz.length > 0 && (
          <AnimatedSection>
            <Quiz
              questions={topic.quiz}
              topicId={topicId}
              onComplete={handleQuizComplete}
            />
          </AnimatedSection>
        )}

        {topic.exercises && topic.exercises.length > 0 && (
          <AnimatedSection>
            <InteractiveExercise
              exercise={{ id: topic.id, title: topic.exercises[0].title }}
              tasks={topic.exercises[0].tasks}
              completedTasks={exerciseProgress}
              onTaskComplete={handleTaskComplete}
            />
          </AnimatedSection>
        )}

        <div className="topic-nav">
          {prevTopic ? (
            <Link to={`/topic/${prevTopic.id}`}>
              ← Previous: {prevTopic.title}
            </Link>
          ) : (
            <span />
          )}
          {nextTopic ? (
            <Link to={`/topic/${nextTopic.id}`}>
              Next: {nextTopic.title} →
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