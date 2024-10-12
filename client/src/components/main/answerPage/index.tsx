import React, { useEffect, useState } from 'react';
import { getMetaData } from '../../../tool';
import AnswerView from './answer';
import AnswerHeader from './header';
import './index.css';
import QuestionBody from './questionBody';
import { getQuestionById } from '../../../services/questionService';
import VoteComponent from '../voteComponent';
import { Question, Comment, Answer } from '../../../types';
import CommentSection from '../commentSection';
import addComment from '../../../services/commentService';
import useUserContext from '../../../hooks/useUserContext';

/**
 * Interface representing the props for the AnswerPage component.
 *
 * - qid - The unique identifier for the question.
 * - handleNewQuestion - Callback function to handle a new question.
 * - handleNewAnswer - Callback function to handle a new answer.
 */
interface AnswerPageProps {
  qid: string;
  handleNewQuestion: () => void;
  handleNewAnswer: () => void;
}

/**
 * AnswerPage component that displays the full content of a question along with its answers.
 * It also includes the functionality to vote, ask a new question, and post a new answer.
 *
 * @param qid The unique identifier of the question to be displayed.
 * @param handleNewQuestion Callback function to handle asking a new question.
 * @param handleNewAnswer Callback function to handle posting a new answer.
 */
const AnswerPage = ({ qid, handleNewQuestion, handleNewAnswer }: AnswerPageProps) => {
  const { socket } = useUserContext();
  const [question, setQuestion] = useState<Question | null>(null);

  const handleNewComment = async (
    comment: Comment,
    targetType: 'question' | 'answer',
    targetId: string | undefined,
  ) => {
    if (!targetId) return;

    try {
      await addComment(targetId, targetType, comment);
      const updatedQuestion = await getQuestionById(qid);
      setQuestion(updatedQuestion || null);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getQuestionById(qid);
        setQuestion(res || null);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching question:', error);
      }
    };

    // eslint-disable-next-line no-console
    fetchData().catch(e => console.log(e));
  }, [qid]);

  useEffect(() => {
    const handleAnswerUpdate = ({ answer }: { qid: string; answer: Answer }) => {
      setQuestion(prevQuestion =>
        prevQuestion
          ? // Creates a new Question object with the new answer appended to the end
            { ...prevQuestion, answers: [...prevQuestion.answers, answer] }
          : prevQuestion,
      );
    };

    const handleCommentUpdate = ({
      result,
      type,
    }: {
      result: Question | Answer;
      type: 'question' | 'answer';
    }) => {
      // TODO: Task 3 - Complete function to handle comment updates from the socket
    };

    socket.on('answerUpdate', handleAnswerUpdate);
    socket.on('viewsUpdate', setQuestion);

    // TODO: Task 3 - Setup appropriate socket listener(s) for comment updates

    return () => {
      socket.off('answerUpdate', handleAnswerUpdate);
      socket.off('viewsUpdate', setQuestion);
    };
  }, [socket]);

  if (!question) {
    return null;
  }

  return (
    <>
      <VoteComponent question={question} />
      <AnswerHeader
        ansCount={question.answers.length}
        title={question.title}
        handleNewQuestion={handleNewQuestion}
      />
      <QuestionBody
        views={question.views}
        text={question.text}
        askby={question.askedBy}
        meta={getMetaData(new Date(question.askDateTime))}
      />
      <CommentSection
        comments={question.comments}
        handleAddComment={(newComment: Comment) =>
          handleNewComment(newComment, 'question', question._id)
        }
      />
      {question.answers.map((a, idx) => (
        <AnswerView
          key={idx}
          text={a.text}
          ansBy={a.ansBy}
          meta={getMetaData(new Date(a.ansDateTime))}
          comments={a.comments}
          handleAddComment={(newComment: Comment) => handleNewComment(newComment, 'answer', a._id)}
        />
      ))}
      <button
        className='bluebtn ansButton'
        onClick={() => {
          handleNewAnswer();
        }}>
        Answer Question
      </button>
    </>
  );
};

export default AnswerPage;
