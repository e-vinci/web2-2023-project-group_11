const express = require('express');
const {
    readAllQuestions,
    readOneQuestion,
    createOneQuestion,
    deleteOneQuizz,
    updateOneQuestion,
    read20Questions
} = require('../models/quizz');
const { authorize, isAdmin } = require('../utils/auths');

const router = express.Router();

// Create a question to be added to the list of qiestion.
router.post('/', authorize, isAdmin, (req, res) => {
    const question = req?.body?.question?.length !== 0 ? req.body.question : undefined;
    const answers = req?.body?.answers?.length !== 0 ? req.body.answers : undefined;
  
    if (!question || !answers) return res.sendStatus(400); // error code '400 Bad request'
  
    const createdQuestion = createOneQuestion(question, answers);
  
    return res.json(createdQuestion);
  });
  
  // Delete a question from the list of qiestion based on its id
  router.delete('/:id', authorize, isAdmin, (req, res) => {
    const deletedQuestion = deleteOneQuizz(req.params.id);
  
    if (!deletedQuestion) return res.sendStatus(404);
  
    return res.json(deletedQuestion);
  });