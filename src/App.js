import React, { useState, useEffect } from 'react';
import Home from './Home';
import CategorySelector from './CategorySelector';
import Question from './Question';
import Result from './Result';
import PremiumBanner from './PremiumBanner';
import Login from './Login';
import Settings from './Settings';
import LoadingSpinner from './LoadingSpinner';
import { useAuth, useQuiz, useTheme, useAds } from './hooks';
import AdComponent from './AdComponent';

const App = () => {
  const { loading, error, isPremium, user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { canAccessPremium } = useAds();

  const [currentView, setCurrentView] = useState('home'); // 'home', 'category', 'quiz', 'settings'
  const [selectedCategory, setSelectedCategory] = useState('mixed');
  const [showSettings, setShowSettings] = useState(false);
  const [quizMode, setQuizMode] = useState(null); // null, 'free', 'premium'

  const {
    currentQuestionIndex,
    score,
    answers,
    timeLeft,
    quizFinished,
    selectedChoice,
    isAnswered,
    shuffledQuestions,
    handleAnswer,
    restartQuiz,
    currentQuestion
  } = useQuiz(quizMode === 'premium' || (quizMode === null && isPremium), selectedCategory);

  // -------------------- Effects --------------------
  useEffect(() => {
    if (!(isPremium || canAccessPremium)) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  }, [isPremium, canAccessPremium]);

  // -------------------- Handlers --------------------
  const handleStartQuiz = (category) => {
    setSelectedCategory(category);
    setCurrentView('quiz');
  };

  const handleSelectMode = (isPremiumMode) => {
    setQuizMode(isPremiumMode ? 'premium' : 'free');
    setCurrentView('category');
  };

  const handleLogout = async () => {
    await logout();
    setCurrentView('home');
    setQuizMode(null);
    restartQuiz();
  };

  const handleUpgrade = () => setShowSettings(true);
  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCategory('mixed');
    setQuizMode(null);
    restartQuiz();
  };
  const handleShowSettings = () => setShowSettings(true);
  const handleCloseSettings = () => setShowSettings(false);

  // -------------------- Sub-components --------------------
  const QuizHeader = () => (
    <header className="quiz-header">
      <button className="back-button" onClick={handleBackToHome}>← Retour</button>
      <h1>
        Quiz {selectedCategory === 'geology' ? 'Géologie' : selectedCategory === 'chemistry' ? 'Chimie' : 'Mixte'}{' '}
        {isPremium || canAccessPremium ? '- Premium' : '- Gratuit'}
      </h1>
      <button className="settings-button" onClick={handleShowSettings}>⚙️</button>
    </header>
  );

  const QuizAds = () => (
    <>
      {!isPremium && <AdComponent slot="1111111111" />}
      {!isPremium && currentQuestionIndex === 0 && <AdComponent slot="2222222222" />}
      {!isPremium && <AdComponent slot="3333333333" />}
    </>
  );

  // -------------------- Render functions --------------------
  const renderLoading = () => <LoadingSpinner />;

  const renderError = () => (
    <div className="app error-container">
      <div className="error-card">
        <h2>Erreur de connexion</h2>
        <p>{error}</p>
        <button className="button" onClick={() => window.location.reload()}>Réessayer</button>
      </div>
    </div>
  );

  const renderSettings = () => (
    <Settings
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      onClose={handleCloseSettings}
    />
  );

  const renderHome = () => (
    <Home
      onStartQuiz={handleSelectMode}
      onGoPremium={handleUpgrade}
      isPremium={isPremium || canAccessPremium}
      user={user}
      onLogout={handleLogout}
    />
  );

  const renderCategorySelector = () => (
    <CategorySelector
      onSelectCategory={handleStartQuiz}
      onBack={handleBackToHome}
      isPremium={isPremium || canAccessPremium}
    />
  );

  const renderQuiz = () => (
    <div className="app">
      <div className="quiz-container">
        <QuizHeader />
        <QuizAds />

        <Question
          question={currentQuestion?.question || ''}
          choices={currentQuestion?.choices || []}
          onAnswer={handleAnswer}
          selectedChoice={selectedChoice}
          timeLeft={timeLeft}
          isPremium={isPremium || canAccessPremium}
          isAnswered={isAnswered}
          correctIndex={currentQuestion?.correctIndex ?? null}
        />

        {!(isPremium || canAccessPremium) && currentQuestionIndex === 0 && (
          <PremiumBanner onUpgrade={handleUpgrade} />
        )}

        <div className="quiz-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}%` }}
            ></div>
          </div>
          <span className="progress-text">
            Question {currentQuestionIndex + 1} sur {shuffledQuestions.length}
          </span>
        </div>
      </div>
    </div>
  );

  const renderResult = () => (
    <div className="app">
      <Result
        score={score}
        total={shuffledQuestions.length}
        questions={shuffledQuestions}
        answers={answers}
        isPremium={isPremium || canAccessPremium}
        onRestart={() => setCurrentView('category')}
        onBackToHome={handleBackToHome}
      />
    </div>
  );

  // -------------------- Main render --------------------
  if (loading) return renderLoading();
  if (error) return renderError();
  if (!user) return <Login />;
  if (showSettings) return renderSettings();
  if (currentView === 'home') return renderHome();
  if (currentView === 'category') return renderCategorySelector();
  if (quizFinished) return renderResult();

  return renderQuiz();
};

export default App;
