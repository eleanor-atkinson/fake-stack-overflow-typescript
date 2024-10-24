import express, { Response } from 'express';
import { Server } from 'socket.io';
import { Comment, AddCommentRequest } from '../types';
import { addComment, populateDocument, saveComment } from '../models/application';

const commentController = (socket: Server) => {
  const router = express.Router();

  /**
   * Checks if the provided answer request contains the required fields.
   *
   * @param req The request object containing the answer data.
   *
   * @returns `true` if the request is valid, otherwise `false`.
   */
  const isRequestValid = (req: AddCommentRequest): boolean => {
    const { id, type, comment } = req.body;
    if (!id || !type || !comment) {
      return false;
    }
    return true;
  };

  /**
   * Validates the comment object to ensure it is not empty.
   *
   * @param comment The comment to validate.
   *
   * @returns `true` if the coment is valid, otherwise `false`.
   */
  const isCommentValid = (comment: Comment): boolean =>
    !!(comment.text && comment.commentBy && comment.commentDateTime);

  /**
   * Handles adding a new comment to the specified question or answer. The comment is first validated and then saved.
   * If the comment is invalid or saving fails, the HTTP response status is updated.
   *
   * @param req The AddCommentRequest object containing the comment data.
   * @param res The HTTP response object used to send back the result of the operation.
   * @param type The type of the comment, either 'question' or 'answer'.
   *
   * @returns A Promise that resolves to void.
   */
  const addCommentRoute = async (req: AddCommentRequest, res: Response): Promise<void> => {
    if (!isRequestValid(req)) {
      res.status(400).send('Invalid request');
      return;
    }

    if (!isCommentValid(req.body.comment)) {
      res.status(400).send('Invalid comment');
      return;
    }

    const { id, type, comment } = req.body;

    try {
      const savedComment = await saveComment(comment);

      if ('error' in savedComment) {
        throw new Error(savedComment.error as string);
      }

      const updatedDocument = await addComment(id, type, savedComment);

      if (updatedDocument && 'error' in updatedDocument) {
        throw new Error(updatedDocument.error as string);
      }

      const populatedDocument = await populateDocument(id, type);

      socket.emit('commentUpdate', {
        result: populatedDocument,
        type,
      });
      res.json(savedComment);
    } catch (err) {
      res.status(500).send(`Error when adding comment: ${(err as Error).message}`);
    }
  };

  router.post('/addComment', addCommentRoute);

  return router;
};

export default commentController;
