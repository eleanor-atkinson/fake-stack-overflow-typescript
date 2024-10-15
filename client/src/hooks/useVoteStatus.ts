import { useState, useEffect } from 'react';
import { downvoteQuestion, upvoteQuestion } from '../services/questionService';
import { Question, VoteData } from '../types';
import useUserContext from './useUserContext';

/**
 * Custom hook to manage the voting logic for a question.
 *
 * @param question - The question object containing voting information.
 */
const useVoteStatus = (question: Question) => {
  const { user, socket } = useUserContext();
  const [count, setCount] = useState<number>(0);
  const [voted, setVoted] = useState<number>(0);

  useEffect(() => {
    const getVoteValue = () => {
      if (user?.username && question?.upVotes?.includes(user.username)) {
        return 1;
      }
      if (user?.username && question?.downVotes?.includes(user.username)) {
        return -1;
      }
      return 0;
    };

    setCount((question.upVotes || []).length - (question.downVotes || []).length);
    setVoted(getVoteValue());

    const handleVoteUpdate = (voteData: VoteData) => {
      if (voteData.qid === question._id) {
        setCount(voteData.upVotes.length - voteData.downVotes.length);
        if (voteData.upVotes.includes(user.username)) {
          setVoted(1);
        } else if (voteData.downVotes.includes(user.username)) {
          setVoted(-1);
        } else {
          setVoted(0);
        }
      }
    };

    socket.on('voteUpdate', handleVoteUpdate);

    return () => {
      socket.off('voteUpdate', handleVoteUpdate);
    };
  }, [question, user.username, socket]);

  const handleVote = async (type: string) => {
    try {
      if (question._id) {
        if (type === 'upvote') {
          await upvoteQuestion(question._id, user.username);
        } else if (type === 'downvote') {
          await downvoteQuestion(question._id, user.username);
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return {
    count,
    voted,
    handleVote,
  };
};

export default useVoteStatus;
