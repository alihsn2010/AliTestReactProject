import { useState } from 'react'
import './App.css'

type Question = {
  question: string
  options: string[]
  correctIndex: number
}

const questions: Question[] = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Paris', 'Rome'],
    correctIndex: 1,
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Venus', 'Jupiter'],
    correctIndex: 0,
  },
  {
    question: 'What is 5 + 3?',
    options: ['6', '8', '10'],
    correctIndex: 1,
  },
  {
    question: 'Which language runs in a web browser?',
    options: ['Python', 'C++', 'JavaScript'],
    correctIndex: 2,
  },
  {
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean'],
    correctIndex: 2,
  },
  {
    question: 'Which company created React?',
    options: ['Google', 'Facebook', 'Microsoft'],
    correctIndex: 1,
  },
  {
    question: 'What is the boiling point of water at sea level?',
    options: ['100°C', '90°C', '120°C'],
    correctIndex: 0,
  },
  {
    question: 'Which animal is known as the King of the Jungle?',
    options: ['Elephant', 'Lion', 'Tiger'],
    correctIndex: 1,
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

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

  return (
    <div className="app-shell">
      <div className="quiz-container">
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
