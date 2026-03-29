import { motion } from 'framer-motion'
import { Code, Terminal, ExternalLink, ArrowRight, FileCode } from 'lucide-react'

export default function PracticeButton({ links }) {
  if (!links || links.length === 0) return null

  const getIcon = (type) => {
    switch (type) {
      case 'remix':
        return <Code size={18} />
      case 'vscode':
        return <Terminal size={18} />
      case 'local':
        return <FileCode size={18} />
      default:
        return <ExternalLink size={18} />
    }
  }

  const getColor = (type) => {
    switch (type) {
      case 'remix':
        return '#6366f1'
      case 'vscode':
        return '#007acc'
      case 'local':
        return '#10b981'
      default:
        return '#64748b'
    }
  }

  return (
    <motion.div
      className="practice-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="practice-header">
        <h3>🧑‍💻 Practice Now</h3>
        <span className="practice-count">{links.length} resource{links.length > 1 ? 's' : ''}</span>
      </div>

      <div className="practice-links">
        {links.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="practice-link-card"
            style={{ '--accent': getColor(link.type) }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="practice-icon" style={{ background: getColor(link.type) }}>
              {getIcon(link.type)}
            </div>
            <div className="practice-info">
              <h4>{link.title}</h4>
              {link.description && <p>{link.description}</p>}
              <span className="practice-type">{link.type}</span>
            </div>
            <ArrowRight size={20} className="practice-arrow" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}

export function QuickStartGuide() {
  const guides = [
    {
      title: 'Remix IDE (Web-based)',
      description: 'No setup needed - start coding right in your browser',
      icon: '⚡',
      link: 'https://remix.ethereum.org'
    },
    {
      title: 'VS Code Setup',
      description: 'Local development environment with Hardhat',
      icon: '💻',
      link: 'https://github.com/nomiclabs/hardhat-vscode'
    },
    {
      title: 'Foundry (Fast Testing)',
      description: 'Lightning-fast smart contract testing framework',
      icon: '🔥',
      link: 'https://github.com/foundry-rs/foundry'
    },
    {
      title: 'Alchemy (Node Provider)',
      description: 'Free API access to Ethereum nodes',
      icon: '🔗',
      link: 'https://www.alchemy.com/'
    }
  ]

  return (
    <motion.div
      className="quickstart-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="quickstart-header">
        <h3>🚀 Quick Start Guides</h3>
        <p>Choose your development environment</p>
      </div>

      <div className="quickstart-grid">
        {guides.map((guide, index) => (
          <motion.a
            key={index}
            href={guide.link}
            target="_blank"
            rel="noopener noreferrer"
            className="quickstart-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="quickstart-icon">{guide.icon}</span>
            <h4>{guide.title}</h4>
            <p>{guide.description}</p>
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}