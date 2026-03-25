import { useState, useEffect } from 'react';

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('blockchain-progress');
    return saved ? JSON.parse(saved) : {
      completedTopics: [],
      completedExercises: {},
      completedQuizzes: {},
      lastVisited: null
    };
  });

  useEffect(() => {
    localStorage.setItem('blockchain-progress', JSON.stringify(progress));
  }, [progress]);

  const completeTopic = (topicId) => {
    setProgress(prev => ({
      ...prev,
      completedTopics: prev.completedTopics.includes(topicId)
        ? prev.completedTopics
        : [...prev.completedTopics, topicId]
    }));
  };

  const completeExerciseTask = (exerciseId, taskId) => {
    setProgress(prev => ({
      ...prev,
      completedExercises: {
        ...prev.completedExercises,
        [exerciseId]: prev.completedExercises[exerciseId]
          ? [...new Set([...prev.completedExercises[exerciseId], taskId])]
          : [taskId]
      }
    }));
  };

  const completeQuiz = (topicId, score) => {
    setProgress(prev => ({
      ...prev,
      completedQuizzes: {
        ...prev.completedQuizzes,
        [topicId]: {
          completed: true,
          score,
          date: new Date().toISOString()
        }
      }
    }));
  };

  const getExerciseProgress = (exerciseId) => {
    return progress.completedExercises[exerciseId] || [];
  };

  const getTopicProgress = (topicId) => {
    const completed = progress.completedTopics.includes(topicId);
    const quiz = progress.completedQuizzes[topicId];
    return { completed, quiz };
  };

  const isExerciseComplete = (exerciseId) => {
    const completedTasks = progress.completedExercises[exerciseId] || [];
    return completedTasks.length > 0;
  };

  return {
    progress,
    completeTopic,
    completeExerciseTask,
    completeQuiz,
    getExerciseProgress,
    getTopicProgress,
    isExerciseComplete
  };
}

export default useProgress;