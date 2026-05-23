import { useState } from 'react'
import questionsData from './questions.json'
import './App.css'

type Question = {
  question: string
  options: string[]
  correctIndex: number
}

const questions: Question[] = questionsData as Question[]
const ADMIN_USER = 'admin'
const ADMIN_PASS = 'admin'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setIsAuthenticated(true)
      setUsername('')
      setPassword('')
    } else {
      setLoginError('Invalid username or password')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="app-shell">
        <div className="quiz-container">
          <div className="login-card">
            <h1 className="login-title">Quiz Login</h1>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  className="form-input"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="admin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {loginError && <p className="error-message">{loginError}</p>}
              <button type="submit" className="login-button">
                Login
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
    setCurrentQuestion(0)
    setSelectedOption(null)
    setScore(0)
    setShowResult(false)
  }

  return (
    <div className="app-shell">
      <div className="quiz-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
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
