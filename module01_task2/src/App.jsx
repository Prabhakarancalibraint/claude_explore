import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Section from './components/Section'
import ExerciseCard from './components/ExerciseCard'
import RoadmapPage from './pages/RoadmapPage'
import TopicPage from './pages/TopicPage'
import ExercisePage from './pages/ExercisePage'
import './styles/App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/topic/:topicId" element={<TopicPage />} />
            <Route path="/exercises" element={<ExercisePage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  )
}

function HomePage() {
  const sections = [
    {
      id: 'intro',
      title: 'Introduction to Blockchain',
      description: 'Start your blockchain journey with fundamentals',
      icon: '🔗',
      color: '#6366f1'
    },
    {
      id: 'cryptography',
      title: 'Cryptography & Hashing',
      description: 'Understand the security foundations',
      icon: '🔐',
      color: '#8b5cf6'
    },
    {
      id: 'networks',
      title: 'Types of Blockchains',
      description: 'Explore L1, L2, and specialized chains',
      icon: '🌐',
      color: '#06b6d4'
    },
    {
      id: 'smart-contracts',
      title: 'Smart Contract Development',
      description: 'Learn to build decentralized applications',
      icon: '📝',
      color: '#10b981'
    },
    {
      id: 'security',
      title: 'Blockchain Security',
      description: 'Master security best practices',
      icon: '🛡️',
      color: '#f59e0b'
    },
    {
      id: 'oracles',
      title: 'Oracles & External Data',
      description: 'Connect blockchain to the real world',
      icon: '🔮',
      color: '#ec4899'
    },
    {
      id: 'dapp',
      title: 'dApp Development',
      description: 'Build full-stack decentralized apps',
      icon: '🚀',
      color: '#ef4444'
    },
    {
      id: 'scaling',
      title: 'Building for Scale',
      description: 'Learn scaling solutions',
      icon: '📈',
      color: '#14b8a6'
    }
  ]

  return (
    <>
      <Hero />

      <Section id="overview" title="Learning Roadmap" subtitle="A comprehensive journey from beginner to advanced blockchain developer">
        <div className="roadmap-grid">
          {sections.map((section, index) => (
            <Link to={`/topic/${section.id}`} key={section.id} className="roadmap-card" style={{ '--delay': `${index * 0.1}s` }}>
              <div className="card-icon" style={{ background: section.color }}>{section.icon}</div>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
              <span className="card-arrow">→</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="exercises" title="Practice Exercises" subtitle="Apply what you learn with hands-on challenges">
        <div className="exercises-preview">
          <ExerciseCard
            title="Build Your First Smart Contract"
            difficulty="Beginner"
            duration="2 hours"
            description="Create a simple storage contract on Ethereum"
          />
          <ExerciseCard
            title="Implement a Token"
            difficulty="Intermediate"
            duration="3 hours"
            description="Deploy an ERC-20 token with custom functionality"
          />
          <ExerciseCard
            title="Create a DeFi Pool"
            difficulty="Advanced"
            duration="5 hours"
            description="Build an automated market maker like Uniswap"
          />
        </div>
        <div className="section-cta">
          <Link to="/exercises" className="btn-primary">View All Exercises →</Link>
        </div>
      </Section>

      <Section id="features" title="Why This Learning Path?" subtitle="Designed for effective learning">
        <div className="features-grid">
          <div className="feature-box">
            <div className="feature-number">01</div>
            <h3>Scrollytelling</h3>
            <p>Immersive learning experience with smooth animations and interactive content</p>
          </div>
          <div className="feature-box">
            <div className="feature-number">02</div>
            <h3>Hands-on Exercises</h3>
            <p>Practical challenges to reinforce your understanding of each topic</p>
          </div>
          <div className="feature-box">
            <div className="feature-number">03</div>
            <h3>Roadmap-Based</h3>
            <p>Follow the proven path from blockchain basics to advanced development</p>
          </div>
          <div className="feature-box">
            <div className="feature-number">04</div>
            <h3>Real-World Examples</h3>
            <p>Learn from practical use cases and real implementations</p>
          </div>
        </div>
      </Section>

      <footer className="footer">
        <div className="container">
          <p>© 2026 Blockchain Academy - Enhanced Edition</p>
          <p>Powered by roadmap.sh</p>
        </div>
      </footer>
    </>
  )
}

export default App