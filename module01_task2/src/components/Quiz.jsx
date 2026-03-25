import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trophy, RefreshCw } from 'lucide-react';

export default function Quiz({ questions, topicId, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (answerIndex) => {
    if (showResult) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === question.correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsComplete(true);
      const finalScore = score + (selectedAnswer === question.correct ? 1 : 0);
      onComplete(topicId, (finalScore / questions.length) * 100);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsComplete(false);
  };

  if (!questions || questions.length === 0) {
    return null;
  }

  if (isComplete) {
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 70;

    return (
      <motion.div
        className="quiz-result"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className={`result-badge ${passed ? 'passed' : 'failed'}`}>
          {passed ? <Trophy size={40} /> : <RefreshCw size={40} />}
          <h3>{passed ? 'Great Job!' : 'Keep Learning!'}</h3>
          <p>You scored {score} out of {questions.length} ({percentage.toFixed(0)}%)</p>
          {!passed && <p className="hint">Review this topic and try again!</p>}
        </div>
        <button className="btn-primary" onClick={restartQuiz}>
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="quiz-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="quiz-header">
        <span className="quiz-badge">📝 Knowledge Check</span>
        <span className="quiz-progress">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      <div className="quiz-question">
        <h3>{question.question}</h3>
      </div>

      <div className="quiz-options">
        {question.options.map((option, index) => {
          let optionClass = 'option';

          if (showResult) {
            if (index === question.correct) {
              optionClass += ' correct';
            } else if (index === selectedAnswer && index !== question.correct) {
              optionClass += ' wrong';
            }
          } else if (selectedAnswer === index) {
            optionClass += ' selected';
          }

          return (
            <motion.button
              key={index}
              className={optionClass}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              whileHover={!showResult ? { scale: 1.02 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-text">{option}</span>
              {showResult && index === question.correct && (
                <CheckCircle size={20} className="icon correct" />
              )}
              {showResult && index === selectedAnswer && index !== question.correct && (
                <XCircle size={20} className="icon wrong" />
              )}
            </motion.button>
          );
        })}
      </div>

      {showResult && (
        <motion.div
          className="quiz-feedback"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className={selectedAnswer === question.correct ? 'correct' : 'wrong'}>
            {selectedAnswer === question.correct
              ? '✓ Correct! Well done!'
              : `✗ Not quite. The correct answer is: ${question.options[question.correct]}`}
          </p>
          <button className="btn-primary" onClick={nextQuestion}>
            {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}