import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CodeBlock({ code, language = 'solidity' }) {
  const [copied, setCopied] = useState(false);

  if (!code) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightCode = (code) => {
    const lines = code.split('\n');

    return lines.map((line, index) => {
      let highlighted = line
        // Comments
        .replace(/(\/\/.*$)/g, '<span class="comment">$1</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
        // Strings
        .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="string">$1</span>')
        // Keywords
        .replace(/\b(contract|function|public|private|internal|external|view|pure|payable|returns|struct|enum|mapping|address|bool|uint|int|string|bytes|modifier|require|emit|event|if|else|for|while|break|continue|return|new|this|super|import|from|as|pragma|solidity|library|using|interface)\b/g, '<span class="keyword">$1</span>')
        // Types with numbers (uint256, int128, etc.)
        .replace(/\b(uint\d+|int\d+|bytes\d+)\b/g, '<span class="type">$1</span>')
        // Numbers
        .replace(/\b(\d+)\b/g, '<span class="number">$1</span>')
        // Ethereum specific
        .replace(/\b(msg|block|tx|abi|this|true|false|null)\b/g, '<span class="builtin">$1</span>')
        // Contract addresses (0x...)
        .replace(/(0x[a-fA-F0-9]{40})/g, '<span class="address">$1</span>');

      return (
        <div key={index} className="code-line">
          <span className="line-number">{index + 1}</span>
          <span className="line-content" dangerouslySetInnerHTML={{ __html: highlighted }} />
        </div>
      );
    });
  };

  return (
    <div className="code-block-container">
      <div className="code-block-header">
        <span className="language-badge">{language}</span>
        <button className="copy-button" onClick={handleCopy}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="code-block">
        <pre>
          <code>
            {highlightCode(code)}
          </code>
        </pre>
      </div>
    </div>
  );
}