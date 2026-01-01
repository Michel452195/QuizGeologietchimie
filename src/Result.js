import React from 'react';

const Result = ({ score, total, questions, answers, isPremium, onRestart, onBackToHome }) => {
  const percentage = Math.round((score / total) * 100);

  const getScoreMessage = () => {
    if (percentage >= 90) return "Excellent ! 🎉";
    if (percentage >= 80) return "Très bien ! 👍";
    if (percentage >= 70) return "Bien joué ! 👌";
    if (percentage >= 60) return "Pas mal ! 🤔";
    return "À améliorer ! 💪";
  };

  return (
    <div className="result-container">
      <h2>Résultats du Quiz</h2>
      <div className="score-display">
        <div className="score">Score: {score} / {total} ({percentage}%)</div>
        <div className="score-message">{getScoreMessage()}</div>
      </div>

      {isPremium && (
        <div className="corrections">
          <h3>Corrections détaillées:</h3>
          {questions.map((q, index) => (
            <div key={index} className="correction">
              <p><strong>Question {index + 1}:</strong> {q.question}</p>
              <p>Votre réponse: {q.choices[answers[index]]}</p>
              <p>Bonne réponse: {q.choices[q.correctIndex]}</p>
              <p className={answers[index] === q.correctIndex ? 'correct' : 'incorrect'}>
                {answers[index] === q.correctIndex ? 'Correct ✓' : 'Incorrect ✗'}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="result-buttons">
        <button className="button secondary" onClick={onBackToHome}>
          ← Retour à l'accueil
        </button>
        <button className="button" onClick={onRestart}>
          Recommencer le Quiz
        </button>
      </div>
    </div>
  );
};

export default Result;