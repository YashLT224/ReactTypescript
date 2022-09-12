import React from 'react';
import {AnswerObject} from '../App'
import { Wrapper, ButtonWrapper } from "./QuestiionCard.style";

type Props={
    question:string;
    answer:string[];
    callback:(e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer:AnswerObject | undefined;
    questionNr:number;
    totalquestions:number;
}

const QuestionCard:React.FC<Props>=({question,answer,callback,userAnswer,questionNr,totalquestions})=>(
<Wrapper>
    <p className="number">Question: {questionNr}/{totalquestions}</p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
        {answer.map(ans=>(
         
            <ButtonWrapper key={ans} correct={userAnswer?.correctAnswer === ans}
            userClicked={userAnswer?.answer === ans}>
                <button disabled={!!userAnswer} value={ans} onClick={callback}>
                <span dangerouslySetInnerHTML={{__html:ans}}></span>
                </button>
               
         
             </ButtonWrapper>
        ))}

    </div>
    </Wrapper>
)


export default QuestionCard;