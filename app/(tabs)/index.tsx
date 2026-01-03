// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';


// interface Question {
//   question: string;
//   options: string[];
//   correct: number;
// }

// const quizData: Question[] = [
//   {
//     question: 'What is the capital of France?',
//     options: ['London', 'Berlin', 'Paris', 'Madrid'],
//     correct: 2,
//   },
//   {
//     question: 'Which planet is known as the Red Planet?',
//     options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
//     correct: 1,
//   },
//   {
//     question: 'What is 2 + 2?',
//     options: ['3', '4', '5', '6'],
//     correct: 1,
//   },
//   {
//     question: 'Who wrote "To Kill a Mockingbird"?',
//     options: ['Harper Lee', 'J.K. Rowling', 'Mark Twain', 'Ernest Hemingway'],
//     correct: 0,
//   },
//   {
//     question: 'What is the largest ocean on Earth?',
//     options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
//     correct: 3,
//   },
// ];

// export default function QuizApp() {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState<number[]>([]);
//   const [score, setScore] = useState(0);
//   const [isQuizCompleted, setIsQuizCompleted] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(10);
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

//   const handleAnswerSelect = (index: number) => {
//     setSelectedIndex(index);
//     setTimeout(() => {
//       const newAnswers = [...answers, index];
//       setAnswers(newAnswers);

//       if (index === quizData[currentQuestionIndex].correct) {
//         setScore(score + 1);
//       }

//       if (currentQuestionIndex < quizData.length - 1) {
//         setCurrentQuestionIndex(currentQuestionIndex + 1);
//         setTimeLeft(10);
//         setSelectedIndex(null);
//       } else {
//         setIsQuizCompleted(true);
//       }
//     }, 500); // delay to show selection
//   };

//   const restartQuiz = () => {
//     setCurrentQuestionIndex(0);
//     setAnswers([]);
//     setScore(0);
//     setIsQuizCompleted(false);
//     setTimeLeft(10);
//   };

//   useEffect(() => {
//     if (timeLeft > 0 && !isQuizCompleted) {
//       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
//       return () => clearTimeout(timer);
//     } else if (timeLeft === 0 && !isQuizCompleted) {
//       handleAnswerSelect(-1);
//     }
//   }, [timeLeft, isQuizCompleted]);

//   if (isQuizCompleted) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>Quiz Completed!</Text>
//         <Text style={styles.score}>
//           Your Score: {score} / {quizData.length}
//         </Text>
//         <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
//           <Text style={styles.restartButtonText}>Restart Quiz</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const currentQuestion = quizData[currentQuestionIndex];

//   return (
//     <View style={styles.container}>
//       <View style={styles.progressContainer}>
//         <Text style={styles.progressText}>
//           Question {currentQuestionIndex + 1} of {quizData.length}
//         </Text>
//         <View style={styles.progressBar}>
//           <View style={[styles.progressFill, { width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` }]} />
//         </View>
//       </View>
//       <View style={styles.timerCircle}>
//         <Text style={styles.timerText}>{timeLeft}</Text>
//       </View>
//       <Text style={styles.question}>{currentQuestion.question}</Text>
//       <View style={styles.optionsContainer}>
//         {currentQuestion.options.map((option, index) => {
//           const letters = ['A', 'B', 'C', 'D'];
//           return (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.optionButton,
//                 selectedIndex === index && styles.selectedOptionButton,
//               ]}
//               onPress={() => handleAnswerSelect(index)}
//             >
//               <View style={styles.optionContent}>
//                 <Ionicons name="radio-button-off" size={20} color="#fff" />
//                 <Text style={styles.optionLetter}>{letters[index]}.</Text>
//                 <Text style={styles.optionText}>{option}</Text>
//               </View>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// }

// const shadowStyle = Platform.select({
//   ios: {
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
//   android: {
//     elevation: 5,
//   },
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f3e5f5',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   progressContainer: {
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   progressText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   progressBar: {
//     width: '80%',
//     height: 10,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 5,
//     overflow: 'hidden',
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: '#6200ea',
//     borderRadius: 5,
//   },
//   timerCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     borderWidth: 3,
//     borderColor: '#6200ea',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   timerText: {
//     fontSize: 18,
//     color: '#e02323ff',
//     fontWeight: 'bold',
//   },
//   question: {
//     fontSize: 24,
//     textAlign: 'center',
//     marginBottom: 40,
//     color: '#333',
//     fontWeight: 'bold',
//   },
//   optionsContainer: {
//     width: '100%',
//     maxWidth: 400,
//   },
//   optionButton: {
//     backgroundColor: '#6200ea',
//     padding: 18,
//     marginVertical: 8,
//     borderRadius: 15,
//     ...shadowStyle,
//   },
//   selectedOptionButton: {
//     backgroundColor: '#7c4dff',
//   },
//   optionContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   optionLetter: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 10,
//     marginRight: 15,
//   },
//   optionText: {
//     color: 'white',
//     fontSize: 16,
//     flex: 1,
//   },
//   score: {
//     fontSize: 24,
//     marginBottom: 40,
//     color: '#333',
//     fontWeight: '600',
//   },
//   restartButton: {
//     backgroundColor: '#03dac6',
//     padding: 18,
//     borderRadius: 15,
//     ...shadowStyle,
//   },
//   restartButtonText: {
//     color: '#000',
//     fontSize: 18,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
// });


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from './firebase';               // firebase.js file
import { ref, onValue, push } from 'firebase/database';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

export default function QuizApp() {
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // 🔥 Fetch quiz from Firebase
  useEffect(() => {
    const quizRef = ref(db, "quiz");
    onValue(quizRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setQuizData(data);
        setLoading(false);
      }
    });
  }, []);

  // 🔥 Timer
  useEffect(() => {
    if (timeLeft > 0 && !isQuizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isQuizCompleted) {
      handleAnswerSelect(-1);
    }
  }, [timeLeft, isQuizCompleted]);

  // 🔥 Handle answer selection
  const handleAnswerSelect = (index: number) => {
    setSelectedIndex(index);
    setTimeout(() => {
      const newAnswers = [...answers, index];
      setAnswers(newAnswers);

      if (index === quizData[currentQuestionIndex]?.correct) {
        setScore(score + 1);
      }

      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(10);
        setSelectedIndex(null);
      } else {
        setIsQuizCompleted(true);
        saveScoreToFirebase(); // 🔥 Save score to Firebase
      }
    }, 500); // delay to show selection
  };

  // 🔥 Restart quiz
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setIsQuizCompleted(false);
    setTimeLeft(10);
    setSelectedIndex(null);
  };

  // 🔥 Save score to Firebase
  const saveScoreToFirebase = () => {
    const scoreRef = ref(db, "scores");
    push(scoreRef, {
      score: score,
      totalQuestions: quizData.length,
      date: new Date().toISOString(),
    });
  };

  // 🔥 Loading screen
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Loading Quiz...</Text>
      </View>
    );
  }

  if (isQuizCompleted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Completed!</Text>
        <Text style={styles.score}>
          Your Score: {score} / {quizData.length}
          hy i am noor
        </Text>
        <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
          <Text style={styles.restartButtonText}>Restart Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Question {currentQuestionIndex + 1} of {quizData.length}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` },
            ]}
          />
        </View>
      </View>
      <View style={styles.timerCircle}>
        <Text style={styles.timerText}>{timeLeft}</Text>
      </View>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => {
          const letters = ['A', 'B', 'C', 'D'];
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedIndex === index && styles.selectedOptionButton,
              ]}
              onPress={() => handleAnswerSelect(index)}
            >
              <View style={styles.optionContent}>
                <Ionicons name="radio-button-off" size={20} color="#fff" />
                <Text style={styles.optionLetter}>{letters[index]}.</Text>
                <Text style={styles.optionText}>{option}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// 🔹 Styles (same as before)
const shadowStyle = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  android: {
    elevation: 5,
  },
});

const styles = StyleSheet.create({
  container: 
  { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3e5f5' },
  title:
   { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  progressContainer:
   { width: '100%', alignItems: 'center', marginBottom: 20 },
  progressText:
   { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  progressBar:
   { width: '80%', height: 10, backgroundColor: '#e0e0e0', borderRadius: 5, overflow: 'hidden' },
  progressFill: 
  { height: '100%', backgroundColor: '#6200ea', borderRadius: 5 },
  timerCircle: 
  { width: 60, height: 60, borderRadius: 30, borderWidth: 3, borderColor: '#6200ea', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  timerText: 
  { fontSize: 18, color: '#e02323ff', fontWeight: 'bold' },
  question:
   { fontSize: 24, textAlign: 'center', marginBottom: 40, color: '#333', fontWeight: 'bold' },
  optionsContainer: 
  { width: '100%', maxWidth: 400 },
  optionButton:
   { backgroundColor: '#6200ea', padding: 18, marginVertical: 8, borderRadius: 15, ...shadowStyle },
  selectedOptionButton: { backgroundColor: '#7c4dff' },
  optionContent: { flexDirection: 'row', alignItems: 'center' },
  optionLetter: { color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginRight: 15 },
  optionText: { color: 'white', fontSize: 16, flex: 1 },
  score: { fontSize: 24, marginBottom: 40, color: '#333', fontWeight: '600' },
  restartButton: { backgroundColor: '#03dac6', padding: 18, borderRadius: 15, ...shadowStyle },
  restartButtonText: { color: '#000', fontSize: 18, textAlign: 'center', fontWeight: 'bold' },
});
