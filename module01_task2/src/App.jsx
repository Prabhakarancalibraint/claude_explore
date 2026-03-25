import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Section from './components/Section'
import ExerciseCard from './components/ExerciseCard'
import ProgressTracker from './components/ProgressTracker'
import RoadmapPage from './pages/RoadmapPage'
import TopicPage from './pages/TopicPage'
import ExercisePage from './pages/ExercisePage'
import { topics, exercises } from './data/blockchainData'
import useProgress from './hooks/useProgress'
import './styles/App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

function App() {
  const progress = useProgress()

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar progress={progress} />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage progress={progress} />} />
            <Route path="/roadmap" element={<RoadmapPage progress={progress} />} />
            <Route path="/topic/:topicId" element={<TopicPage progress={progress} />} />
            <Route path="/exercises" element={<ExercisePage progress={progress} />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  )
}

function HomePage({ progress }) {
  return (
    <>
      <Hero />

      <Section id="progress" title="Your Progress" subtitle="Track your blockchain learning journey">
        <ProgressTracker progress={progress.progress} topics={topics} />
      </Section>

      <Section id="overview" title="Learning Roadmap" subtitle="A comprehensive journey from beginner to advanced blockchain developer">
        <div className="roadmap-grid">
          {topics.map((section, index) => {
            const { completed } = progress.getTopicProgress(section.id);
            return (
              <Link
                to={`/topic/${section.id}`}
                key={section.id}
                className={`roadmap-card ${completed ? 'completed' : ''}`}
                style={{ '--delay': `${index * 0.1}s` }}
              >
                {completed && <span className="completed-badge">✓</span>}
                <div className="card-icon" style={{ background: section.color }}>
                  {section.icon}
                </div>
                <h3>{section.title}</h3>
                <p>{section.subtitle}</p>
                <span className="card-arrow">→</span>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section id="exercises" title="Practice Exercises" subtitle="Apply what you learn with hands-on challenges">
        <div className="exercises-preview">
          {exercises.slice(0, 3).map((exercise) => {
            const completedTasks = progress.getExerciseProgress(exercise.id);
            const isComplete = completedTasks && completedTasks.length >= exercise.tasks.length;
            return (
              <ExerciseCard
                key={exercise.id}
                title={exercise.title}
                difficulty={exercise.difficulty}
                duration={exercise.duration}
                description={exercise.description}
                isComplete={isComplete}
              />
            );
          })}
        </div>
        <div className="section-cta">
          <Link to="/exercises" className="btn-primary">View All Exercises →</Link>
        </div>
      </Section>

      <Section id="features" title="Why This Learning Path?" subtitle="Designed for effective learning">
        <div className="features-grid">
          <div className="feature-box">
            <div className="feature-number">01</div>
            <h3>Comprehensive Content</h3>
            <p>Everything about blockchain from basics to advanced topics</p>
          </div>
          <div className="feature-box">
            <div className="feature-number">02</div>
            <h3>Interactive Exercises</h3>
            <p>Track progress with checkboxes, hints, and completion badges</p>
          </div>
          <div className="feature-box">
            <div className="feature-number">03</div>
            <h3>Knowledge Quizzes</h3>
            <p>Test your understanding with interactive quizzes</p>
          </div>
          <div className="feature-box">
            <div className="feature-number">04</div>
            <h3>Progress Tracking</h3>
            <p>Save your progress locally and pick up where you left off</p>
          </div>
        </div>
      </Section>

      <footer className="footer">
        <div className="container">
          <p>© 2026 Blockchain Academy - Complete Edition</p>
          <p>One app. All of blockchain.</p>
        </div>
      </footer>
    </>
  )
}

export default App