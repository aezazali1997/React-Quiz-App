import React,{useState,MouseEvent} from 'react';
import { QuestionCard } from './components/QuestionCard/QuestionCard';
import {fetchedQuestions, QuestionState} from './components/api'
import {Difficulty} from './components/Enum'
import Styles from './app.module.css'

const TOTAL_QUESTIONS = 10;

type AnswerObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string,
}

function App() {

  //hooks for the data
  const [loading,setLoading] = useState(false);
  const [questions,setQuestions] = useState<QuestionState[]>([]);
  const [number,setNumber] = useState(0);
  const [userAnswers,setUserAnswers] = useState<AnswerObject[]>([]);
  const [score,setScore] = useState(0);
  const [gameOver,setGameOver] = useState(true)
  // functions for the questions
  const startQuiz = async()=>{
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchedQuestions(TOTAL_QUESTIONS,Difficulty.EASY);
    setQuestions(newQuestions);
    console.log(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0)
    setLoading(false)
      }

  const nextQuestion = async()=>{
    number+1 ===TOTAL_QUESTIONS ? setGameOver(true) : setNumber(number+1) 
  }
  const checkAnswer = (e: MouseEvent<HTMLButtonElement>)=>{
  if(!gameOver){
    const answer=e.currentTarget.value;
    const correct=questions[number].correct_answer===answer
    if(correct){
      setScore(pre=>pre+1)
    }
    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer:questions[number].correct_answer
    }
    setUserAnswers(prev =>[...prev,answerObject])
  }

  }
  
  return (
    <div className={Styles.App}>
      <h1 className={Styles.heading}>React Quiz App</h1>
      {
        gameOver || userAnswers.length === TOTAL_QUESTIONS ? (<button className={Styles.btn} onClick={startQuiz}>Start Quiz</button>) : null
      }
      {
        !gameOver ? (<p className={Styles.score}>Score : {score} </p>) : null
      }
      {
        loading ? (<p className={Styles.loading}>Loading...</p>) : null  
      }
      {
        
      }
      {

        !gameOver && !loading ? (
        <QuestionCard 
        questionNumber={number+1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] :undefined }
        callback={checkAnswer}
        /> ) : null
        }
      {
        !gameOver && !loading && userAnswers.length===number+1 && number !== TOTAL_QUESTIONS-1 ? (
        <button className={Styles.btn} onClick={nextQuestion}>Next</button>
        ) : null
      }
      </div>      
  );
}

export default App;
