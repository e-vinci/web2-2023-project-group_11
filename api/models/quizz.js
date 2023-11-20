const path = require('node:path');
const escape = require('escape-html');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/quizz.json');
// Pas de fichier DATA , a ajouter


const defaultQuizz = [
    {
      id: 1,
      question: 'Quelle couleur est le ciel ?',
      answers: [
        {
          text: "bleu",
          isCorrect: true
        },
        {
          text: "vert",
          isCorrect: false
        },
        {
          text: "rouge",
          isCorrect: false
        },
        {
            text: "orange",
            isCorrect: false
        }
      ]
    },
  ];

  function readAllQuestions(orderBy) {
    const orderByAlphabet = orderBy?.includes('question') ? orderBy : undefined;
   
    let questionList;
    const quizz = parse(jsonDbPath,defaultQuizz);
    if (orderByAlphabet) questionList = [...quizz].sort((a, b) => a.question.localeCompare(b.question));
    

    const quizzReturn = questionList ?? quizz;
    return quizzReturn;
  }

  function readOneQuestion(id) {

    const idNumber = parseInt(id, 10);
    const quizz = parse(jsonDbPath, defaultQuizz);
    const indexOfQuestionFound = quizz.findIndex((question) => question.id === idNumber);
    if (indexOfQuestionFound < 0) return undefined;

  return quizz[indexOfQuestionFound];
    
  }

  function createOneQuestion(question, answers) {
    const quizz = parse(jsonDbPath, defaultQuizz);
  
    const newQuestion = {
      id: getNextId(),
      question: escape(question),
      answers: escape(answers),
    };
  
    quizz.push(newQuestion);
  
    serialize(jsonDbPath, quizz);
  
    return newQuestion;
  }

  function getNextId() {
    const quizz = parse(jsonDbPath, defaultQuizz);
    const lastItemIndex = quizz?.length !== 0 ? quizz.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = quizz[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
  }

  function deleteOneQuizz(id) {
    const idNumber = parseInt(id, 10);
    const quizz = parse(jsonDbPath, defaultQuizz);
    const foundIndex = quizz.findIndex((question) => question.id === idNumber);
    if (foundIndex < 0) return undefined;
    const deletedQuestions = quizz.splice(foundIndex, 1);
    const deletedQuestion = deletedQuestions[0];
    serialize(jsonDbPath, quizz);
  
    return deletedQuestion;
  }

  function updateOneQuestion(id, propertiesToUpdate) {
    const idNumber = parseInt(id, 10);
    const quizz = parse(jsonDbPath, defaultQuizz);
    const foundIndex = quizz.findIndex((question) => question.id === idNumber);
    if (foundIndex < 0) return undefined;
  
    const updatedQuestion = { ...quizz[foundIndex], ...propertiesToUpdate };
  
    quizz[foundIndex] = updatedQuestion;
  
    serialize(jsonDbPath, quizz);
  
    return updatedQuestion;
  }

  module.exports = {
    readAllQuestions,
    readOneQuestion,
    createOneQuestion,
    deleteOneQuizz,
    updateOneQuestion
  };