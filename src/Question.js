import React from 'react';

const Question = ({
  question,
  choices,
  onAnswer,
  selectedChoice,
  timeLeft,
  isPremium,
  isAnswered,
  correctIndex
}) => {
  const getChoiceClass = (index) => {
    let baseClass = 'choice';
    if (selectedChoice === index) baseClass += ' selected';
    if (isAnswered) {
      if (index === correctIndex) baseClass += ' correct';
      else if (index === selectedChoice && index !== correctIndex) baseClass += ' incorrect';
    }
    return baseClass;
  };

  const getTimerClass = () => {
    if (timeLeft <= 5) return 'timer urgent';
    if (timeLeft <= 10) return 'timer warning';
    return 'timer';
  };

  return (
    <div className="question-container">
      <div className={getTimerClass()}>
        ⏱️ {timeLeft}s
      </div>
      <div className="question">
        {question}
      </div>
      <div className="choices">
        {choices?.map((choice, index) => (
          <button
            key={index}
            className={getChoiceClass(index)}
            onClick={() => onAnswer(index)}
            disabled={isAnswered || timeLeft === 0}
          >
            <span className="choice-letter">
              {String.fromCharCode(65 + index)}.
            </span>
            <span className="choice-text">{choice}</span>
            {isAnswered && index === correctIndex && (
              <span className="correct-icon">✓</span>
            )}
            {isAnswered && index === selectedChoice && index !== correctIndex && (
              <span className="incorrect-icon">✗</span>
            )}
          </button>
        ))}
      </div>
      {isAnswered && (
        <div className="feedback">
          {selectedChoice === correctIndex ? (
            <div className="feedback-correct">
              <span className="feedback-icon">🎉</span>
              Bonne réponse !
            </div>
          ) : (
            <div className="feedback-incorrect">
              <span className="feedback-icon">💭</span>
              La bonne réponse était : {choices[correctIndex]}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;