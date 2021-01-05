import React, {FC} from 'react'
import Styles from './QuestionCard.module.css'
//type props
type Props ={
  question:string,
  answers:string[],
  callback:any,
  userAnswer:any,
  questionNumber:number,
  totalQuestions:number,
}
export const QuestionCard:FC<Props> = ({question, answers, callback,userAnswer,questionNumber,totalQuestions}) => {
  return (
    <div className={Styles.container}>
      <p className={Styles.questionNumber}>Question :{questionNumber} / {totalQuestions}</p>
      <p className={Styles.question}>{question}</p>
      {
      }
      <div>
        {
          
          answers?.map((answer,index)=>(
          <div key={index} >
          <button className={Styles.btn} disabled={userAnswer} value={answer} onClick={callback}>
              {answer}
          </button>
          </div>
        ))
        }
      
      </div>
    </div>
  )
}
