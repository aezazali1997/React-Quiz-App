import {Difficulty} from './Enum'
import {shuffleArray} from './utilities'
export const fetchedQuestions = async(amount:number,defficulty:Difficulty) => {
  const endPoint  = `https://opentdb.com/api.php?amount=${amount}&difficulty=${defficulty}&type=multiple`;
  const data=await (await fetch(endPoint)).json();

  return data.results.map((question:Question)=>({
    ...question,
    answers: shuffleArray([...question.incorrect_answers,question.correct_answer])
  }))

}
export type Question = {
  category:string,
  correct_answer:string,
  incorrect_answers:string[],
  question:string,
  type:string
}
export type QuestionState = Question & {answers:string[]}; 