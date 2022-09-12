import React, { useState } from "react";
import {fetchQuizQuestions,QuestionsState,Difficulty} from './API'
import { GlobalStyle, Wrapper } from "./app.styles";
import QuestionCard from "./components/QuestionCard";
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const App = () => {


  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      10,
      Difficulty.EASY
    );
    console.log(newQuestions);
    setQuestions(newQuestions);
    setScore(0);
    setNumber(0);
    setLoading(false);
  };
   
 
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      //user answer
      const answer=e.currentTarget.value;
      //check answer against correct answer
      const correct=questions[number].correct_answer===answer;
      if(correct)setScore(prev=>prev+1);
      //save answer in the array for user answers
      const answerObject={
        question:questions[number].question,
        answer,
        correct,
        correctAnswer:questions[number].correct_answer
      };
      setUserAnswers(prev=>[...prev,answerObject])
    }
  };

  const nextQuestion = () => {
    //move on to next question if not the last question
    const nextQuestion=number+1;
    if(nextQuestion===10){
      setGameOver(true)
    }
    else{
      setNumber(nextQuestion);
    }
  };
  return (
    <>
    <GlobalStyle/>
    <Wrapper>
      <div className="h1">REACT QUIZ</div>
      {gameOver || userAnswers.length === 10 ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading ? <p>Loading Questions...</p> : null}
      {!loading && !gameOver && ( <QuestionCard
        questionNr={number + 1}
        totalquestions={10}
        question={questions[number].question}
        answer={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />
      )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== 10 - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
        </Wrapper>
    </>
  );
};

export default App;
