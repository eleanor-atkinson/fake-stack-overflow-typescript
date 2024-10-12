import React, { useState } from 'react';
import { handleHyperlink } from '../../../../tool';
import CommentSection from '../../commentSection';
import './index.css';
import { Comment } from '../../../../types';

/**
 * Interface representing the props for the Answer component.
 *
 * - text - The content of the answer
 * - ansBy - The username of the user who wrote the answer
 * - meta - Additional metadata related to the answer
 * - comments - List of comments for the answer
 * - handleAddComment - A function that handles adding a new comment. It takes a `Comment` object as an argument.
 */
interface AnswerProps {
  text: string;
  ansBy: string;
  meta: string;
  comments: Comment[];
  handleAddComment: (comment: Comment) => void;
}

/**
 * Answer component that displays the content of an answer with the author's name and metadata.
 * The content is processed to handle hyperlinks.
 *
 * @param text The content of the answer.
 * @param ansBy The username of the answer's author.
 * @param meta Additional metadata related to the answer.
 * @param comments List of comments related to the answer.
 */
const AnswerView = ({ text, ansBy, meta, comments }: AnswerProps) => {
  const [answerComments, setAnswerComments] = useState<Comment[]>(comments);

  const handleAddComment = (newComment: Comment) => {
    setAnswerComments([...answerComments, newComment]);
  };

  return (
    <div className='answer right_padding'>
      <div id='answerText' className='answerText'>
        {handleHyperlink(text)}
      </div>
      <div className='answerAuthor'>
        <div className='answer_author'>{ansBy}</div>
        <div className='answer_question_meta'>{meta}</div>
      </div>
      <CommentSection comments={answerComments} handleAddComment={handleAddComment} />
    </div>
  );
};

export default AnswerView;
