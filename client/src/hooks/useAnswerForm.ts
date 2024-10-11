import { useState } from 'react';
import { Answer } from '../types';
import addAnswer from '../services/answerService';
import useUserContext from './useUserContext';
import { validateHyperlink } from '../tool';

/**
 * Custom hook to manage the logic and state for the NewAnswer component.
 * It handles form input, validation, and submission.
 *
 * @param qid - The question ID for which the answer is being submitted.
 * @param handleAnswer - The function to handle the successful answer submission.
 * @returns Object containing form data, error state, and submission handler.
 */
const useAnswerForm = (qid: string, handleAnswer: (qid: string) => void) => {
  const { user } = useUserContext();

  const [text, setText] = useState<string>('');
  const [textErr, setTextErr] = useState<string>('');

  const postAnswer = async () => {
    let isValid = true;

    if (!text) {
      setTextErr('Answer text cannot be empty');
      isValid = false;
    }

    if (!validateHyperlink(text)) {
      setTextErr('Invalid hyperlink format.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const answer: Answer = {
      text,
      ansBy: user.username,
      ansDateTime: new Date(),
    };

    try {
      const res = await addAnswer(qid, answer);
      if (res && res._id) {
        handleAnswer(qid);
      }
    } catch (error) {
      setTextErr('Error submitting the answer.');
    }
  };

  return {
    text,
    setText,
    textErr,
    postAnswer,
  };
};

export default useAnswerForm;
