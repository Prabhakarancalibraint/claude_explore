import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <span className="logo-icon">⬡</span>
          Blockchain Academy
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/roadmap">Roadmap</Link>
          <Link to="/exercises">Exercises</Link>
        </div>
      </div>
    </nav>
  )
}