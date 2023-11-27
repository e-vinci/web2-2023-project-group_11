/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const express = require('express');
const {
  readAllQuestions,
  readOneQuestion,
  createOneQuestion,
  deleteOneQuestion,
  updateOneQuestion,
  read20Questions,
} = require('../models/quizz');
const { authorize, isAdmin } = require('../utils/auths');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('entre /quizz route');
  const allQuestion = readAllQuestions(req?.query?.order);

  return res.json(allQuestion);
});

// Return 20 questions des categorie selectionnées
router.get('/20', (req, res) => {
  console.log('entre 20 question');
  const categories = req?.query?.categorie?.length !== 0 ? req.query.categorie : undefined;
  console.log(categories);

  const vingtQuestions = read20Questions(categories);
  return res.json(vingtQuestions);
});

// Create a question to be added to the list of qiestion.
router.post('/addQuestion', authorize, isAdmin, (req, res) => {
  const question = req?.body?.question?.length !== 0 ? req.body.question : undefined;
  const answers = req?.body?.answers?.length !== 0 ? req.body.answers : undefined;
  const categorie = req?.body?.categorie?.length !== 0 ? req.body.categorie : undefined;

  if (!question || !answers || !categorie) return res.sendStatus(400); // error code '400 Bad request'

  const createdQuestion = createOneQuestion(question, answers, categorie);

  return res.json(createdQuestion);
});

// Delete a question from the list of qiestion based on its id
router.delete('/:id', authorize, isAdmin, (req, res) => {
  const deletedQuestion = deleteOneQuestion(req.params.id);

  if (!deletedQuestion) return res.sendStatus(404);

  return res.json(deletedQuestion);
});

//Get with categories in parameters
router.get('/quizz', (req, res) => {
  
  const allQuestion = readAllQuestions(req?.query?.order);

  return res.json(allQuestion);
});

// GET a router from
module.exports = router;
