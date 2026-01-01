import { useState, useEffect, useCallback, useMemo } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import quizFreeData from './quizFreeData';
import quizPremiumData from './quizPremiumData';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      setError(null);
    }, (err) => {
      console.warn('Firebase Auth not available:', err.message);
      // If auth is not enabled, treat as not premium
      setUser(null);
      setLoading(false);
      setError(null);
    });
    return unsubscribe;
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.warn('Logout failed:', err.message);
      // Even if logout fails, treat as logged out locally
      setUser(null);
    }
  }, []);

  return { user, loading, error, isPremium: !!user, logout };
};

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    // Use a timeout to avoid ResizeObserver issues
    const timer = setTimeout(() => {
      document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
    }, 0);
    return () => clearTimeout(timer);
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return { isDarkMode, toggleDarkMode };
};

export const useQuiz = (isPremium, selectedCategory = 'mixed') => {
  const quizData = isPremium ? quizPremiumData : quizFreeData;

  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'mixed') return quizData;

    return quizData.filter(question => {
      // Simple filtering based on question content
      if (selectedCategory === 'geology') {
        return question.question.toLowerCase().includes('roche') ||
               question.question.toLowerCase().includes('minéral') ||
               question.question.toLowerCase().includes('tectonique') ||
               question.question.toLowerCase().includes('volcan') ||
               question.question.toLowerCase().includes('faille');
      }
      if (selectedCategory === 'chemistry') {
        return question.question.toLowerCase().includes('chimique') ||
               question.question.toLowerCase().includes('élément') ||
               question.question.toLowerCase().includes('réaction') ||
               question.question.toLowerCase().includes('formule') ||
               question.question.toLowerCase().includes('liaison');
      }
      return true;
    });
  }, [quizData, selectedCategory]);

  const shuffledQuestions = useMemo(() => {
    return [...filteredQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
  }, [filteredQuestions]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(isPremium ? 20 : 15);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Reset quiz when premium status or category changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setTimeLeft(isPremium ? 20 : 15);
    setQuizFinished(false);
    setSelectedChoice(null);
    setIsAnswered(false);
  }, [isPremium, selectedCategory]);

  // Timer effect
  useEffect(() => {
    const handleTimeout = () => {
      setAnswers(prev => [...prev, -1]); // -1 indicates timeout
      setTimeout(() => {
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setTimeLeft(isPremium ? 20 : 15);
          setSelectedChoice(null);
          setIsAnswered(false);
        } else {
          setQuizFinished(true);
        }
      }, 1000);
    };

    if (timeLeft > 0 && !quizFinished && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizFinished && !isAnswered) {
      handleTimeout();
    }
  }, [timeLeft, quizFinished, isAnswered, currentQuestionIndex, shuffledQuestions, isPremium]);

  const handleAnswer = useCallback((choiceIndex) => {
    if (isAnswered) return;

    setSelectedChoice(choiceIndex);
    setIsAnswered(true);
    const newAnswers = [...answers, choiceIndex];
    setAnswers(newAnswers);

    const isCorrect = choiceIndex === shuffledQuestions[currentQuestionIndex].correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setTimeLeft(isPremium ? 20 : 15);
        setSelectedChoice(null);
        setIsAnswered(false);
      } else {
        setQuizFinished(true);
      }
    }, 1500);
  }, [currentQuestionIndex, shuffledQuestions, answers, isPremium, isAnswered]);

  const restartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setTimeLeft(isPremium ? 20 : 15);
    setQuizFinished(false);
    setSelectedChoice(null);
    setIsAnswered(false);
  }, [isPremium]);

  return {
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
    currentQuestion: shuffledQuestions[currentQuestionIndex]
  };
};

export const useAds = () => {
  // Simplified ads hook - user will handle monetization with Google AdSense
  const [adsWatched, setAdsWatched] = useState(() => {
    const saved = localStorage.getItem('adsWatched');
    return saved ? JSON.parse(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('adsWatched', JSON.stringify(adsWatched));
  }, [adsWatched]);

  const watchAd = useCallback(() => {
    // Simulate watching an ad for demo purposes
    setTimeout(() => {
      setAdsWatched(prev => prev + 1);
    }, 2000);
  }, []);

  // For demo purposes, allow premium access after watching some ads
  const canAccessPremium = useMemo(() => {
    return adsWatched >= 3;
  }, [adsWatched]);

  return {
    adsWatched,
    watchAd,
    canAccessPremium
  };
};