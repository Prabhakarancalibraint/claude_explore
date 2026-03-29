import { Link } from 'react-router-dom'
import { BookOpen, Trophy, CheckCircle } from 'lucide-react'

export default function Navbar({ progress }) {
  const completedTopics = progress?.progress?.completedTopics?.length || 0

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <span className="logo-icon">⬡</span>
          <span className="logo-text">Blockchain Academy</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            <BookOpen size={18} />
            Home
          </Link>
          <Link to="/roadmap" className="nav-link">
            <Trophy size={18} />
            Roadmap
            {completedTopics > 0 && (
              <span className="nav-badge">{completedTopics}</span>
            )}
          </Link>
          <Link to="/exercises" className="nav-link">
            <CheckCircle size={18} />
            Exercises
          </Link>
        </div>
      </div>
    </nav>
  )
}