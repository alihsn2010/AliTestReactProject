import { useState } from 'react'
import questionsData from './questions.json'
import './App.css'

type Question = {
  question: string
  options: string[]
  correctIndex: number
}

const questions: Question[] = questionsData as Question[]

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (userName.trim() && userEmail.trim()) {
      setIsAuthenticated(true)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="app-shell">
        <div className="quiz-container">
          <div className="login-card">
            <h1 className="login-title">Start Quiz</h1>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-input"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-button">
                Start Quiz
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  const handleOptionClick = (index: number) => {
    setSelectedOption(index)
  }

  const handleNext = () => {
    if (selectedOption === null) {
      return
    }

    if (selectedOption === question.correctIndex) {
      setScore((currentScore) => currentScore + 1)
    }

    const nextIndex = currentQuestion + 1
    if (nextIndex < questions.length) {
      setCurrentQuestion(nextIndex)
      setSelectedOption(null)
      return
    }

    setShowResult(true)
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setScore(0)
    setShowResult(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserName('')
    setUserEmail('')
    setCurrentQuestion(0)
    setSelectedOption(null)
    setScore(0)
    setShowResult(false)
  }

  return (
    <div className="app-shell">
      <div className="quiz-container">
        <button className="logout-button" onClick={handleLogout}>
          Start Over
        </button>
        {showResult ? (
          <div className="result-card">
            <p className="result-label">Quiz complete</p>
            <h1 className="result-score">{score} / {questions.length}</h1>
            <p className="result-copy">
              You answered {score} out of {questions.length} questions correctly.
            </p>
            <button className="restart-button" type="button" onClick={handleRestart}>
              Restart Quiz
            </button>
          </div>
        ) : (
          <div className="quiz-card">
            <p className="welcome-message">Welcome {userName}</p>
            <div className="quiz-meta">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <h1 className="quiz-question">{question.question}</h1>
            <div className="options">
              {question.options.map((option, index) => (
                <button
                  key={option}
                  type="button"
                  className={`option-button ${selectedOption === index ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(index)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              className="next-button"
              type="button"
              onClick={handleNext}
              disabled={selectedOption === null}
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
