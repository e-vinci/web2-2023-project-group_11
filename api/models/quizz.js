const path = require('node:path');
const escape = require('escape-html');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/quizz.json');
// Pas de fichier DATA , a ajouter

function readAllQuestions() {
  console.log('entre readallquestion model');
  const quizz = parse(jsonDbPath, defaultQuizz);

  const quizzReturn = quizz;
  return quizzReturn;
}

function readOneQuestion(id) {
  const idNumber = parseInt(id, 10);
  const quizz = parse(jsonDbPath, defaultQuizz);
  const indexOfQuestionFound = quizz.findIndex((question) => question.id === idNumber);
  if (indexOfQuestionFound < 0) return undefined;

  return quizz[indexOfQuestionFound];
}

function createOneQuestion(question, answers, categorie) {
  const quizz = parse(jsonDbPath, defaultQuizz);

  const newQuestion = {
    id: getNextId(),
    question: escape(question),
    categorie: escape(categorie),
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

function read20Questions(categories) {
  const count = 20;
  const tabCateg = categories;
  const quizz = parse(jsonDbPath, defaultQuizz);
  // faire la methode pour selectioner 20 question

  const filteredQuestions = [...quizz].filter((question) => categories.includes(question.category));

  if (filteredQuestions.length < count) {
    throw new Error('Pas assez de questions dans les catégories spécifiées.');
  }

  const selectedQuestions = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    const selectedQuestion = filteredQuestions.splice(randomIndex, 1)[0];
    selectedQuestions.push(selectedQuestion);
  }

  return selectedQuestions;
}

module.exports = {
  readAllQuestions,
  readOneQuestion,
  createOneQuestion,
  deleteOneQuizz,
  updateOneQuestion,
  read20Questions,
};

const defaultQuizz = [
  {
    id: 1,
    question: 'Quelle couleur est le ciel ?',
    categorie: 'Trivia',
    answers: [
      {
        text: 'bleu',
        isCorrect: true,
      },
      {
        text: 'vert',
        isCorrect: false,
      },
      {
        text: 'rouge',
        isCorrect: false,
      },
      {
        text: 'orange',
        isCorrect: false,
      },
    ],
  },
  {
    id: 2,
    question: 'test question 2  trivia?',
    categorie: 'Trivia',
    answers: [
      {
        text: 'bleu',
        isCorrect: true,
      },
      {
        text: 'vert',
        isCorrect: false,
      },
      {
        text: 'rouge',
        isCorrect: false,
      },
      {
        text: 'orange',
        isCorrect: false,
      },
    ],
  },
  {
    id: 3,
    question: "Quelle est la capitale de l'Espagne ?",
    categorie: 'Géographie',
    answers: [
      {
        text: 'Paris',
        isCorrect: false,
      },
      {
        text: 'Berlin',
        isCorrect: false,
      },
      {
        text: 'Madrid',
        isCorrect: true,
      },
      {
        text: 'Londres',
        isCorrect: false,
      },
    ],
  },
  {
    id: 4,
    question: 'Combien de côtés a un triangle ?',
    categorie: 'Mathématiques',
    answers: [
      {
        text: '3',
        isCorrect: true,
      },
      {
        text: '4',
        isCorrect: false,
      },
      {
        text: '5',
        isCorrect: false,
      },
      {
        text: '6',
        isCorrect: false,
      },
    ],
  },
  {
    id: 5,
    question: 'Quelle planète est la plus proche du soleil ?',
    categorie: 'Astronomie',
    answers: [
      {
        text: 'Vénus',
        isCorrect: false,
      },
      {
        text: 'Terre',
        isCorrect: false,
      },
      {
        text: 'Mercure',
        isCorrect: true,
      },
      {
        text: 'Mars',
        isCorrect: false,
      },
    ],
  },
  {
    id: 6,
    question: 'Qui a peint la Joconde ?',
    categorie: 'Art',
    answers: [
      {
        text: 'Vincent van Gogh',
        isCorrect: false,
      },
      {
        text: 'Leonardo da Vinci',
        isCorrect: true,
      },
      {
        text: 'Pablo Picasso',
        isCorrect: false,
      },
      {
        text: 'Claude Monet',
        isCorrect: false,
      },
    ],
  },
  {
    id: 7,
    question: 'Quelle est la capitale du Japon ?',
    categorie: 'Géographie',
    answers: [
      {
        text: 'Pékin',
        isCorrect: false,
      },
      {
        text: 'Séoul',
        isCorrect: false,
      },
      {
        text: 'Tokyo',
        isCorrect: true,
      },
      {
        text: 'Bangkok',
        isCorrect: false,
      },
    ],
  },
  {
    id: 8,
    question: 'Qui a écrit "Hamlet" ?',
    categorie: 'Littérature',
    answers: [
      {
        text: 'Charles Dickens',
        isCorrect: false,
      },
      {
        text: 'William Shakespeare',
        isCorrect: true,
      },
      {
        text: 'Jane Austen',
        isCorrect: false,
      },
      {
        text: 'F. Scott Fitzgerald',
        isCorrect: false,
      },
    ],
  },
  {
    id: 9,
    question: 'Quel est le plus grand océan du monde ?',
    categorie: 'Géographie',
    answers: [
      {
        text: 'Océan Atlantique',
        isCorrect: false,
      },
      {
        text: 'Océan Arctique',
        isCorrect: false,
      },
      {
        text: 'Océan Indien',
        isCorrect: false,
      },
      {
        text: 'Océan Pacifique',
        isCorrect: true,
      },
    ],
  },
  {
    id: 10,
    question: 'Combien de continents y a-t-il sur Terre ?',
    categorie: 'Géographie',
    answers: [
      {
        text: '5',
        isCorrect: false,
      },
      {
        text: '6',
        isCorrect: false,
      },
      {
        text: '7',
        isCorrect: true,
      },
      {
        text: '8',
        isCorrect: false,
      },
    ],
  },
  {
    id: 11,
    question: 'Quel est le plus grand désert du monde ?',
    categorie: 'Géographie',
    answers: [
      {
        text: 'Désert de Gobi',
        isCorrect: false,
      },
      {
        text: 'Désert du Sahara',
        isCorrect: true,
      },
      {
        text: "Désert d'Atacama",
        isCorrect: false,
      },
      {
        text: 'Désert de Kalahari',
        isCorrect: false,
      },
    ],
  },
  {
    id: 12,
    question: 'Quel est le plus grand océan du monde ?',
    categorie: 'Géographie',
    answers: [
      {
        text: 'Océan Atlantique',
        isCorrect: false,
      },
      {
        text: 'Océan Arctique',
        isCorrect: false,
      },
      {
        text: 'Océan Indien',
        isCorrect: false,
      },
      {
        text: 'Océan Pacifique',
        isCorrect: true,
      },
    ],
  },
  {
    id: 13,
    question: 'Quel est le plus grand désert du monde ?',
    categorie: 'Géographie',
    answers: [
      {
        text: 'Désert de Gobi',
        isCorrect: false,
      },
      {
        text: 'Désert du Sahara',
        isCorrect: true,
      },
      {
        text: "Désert d'Atacama",
        isCorrect: false,
      },
      {
        text: 'Désert de Kalahari',
        isCorrect: false,
      },
    ],
  },
  {
    id: 14,
    question: 'Qui a peint la Joconde ?',
    categorie: 'Art',
    answers: [
      {
        text: 'Vincent van Gogh',
        isCorrect: false,
      },
      {
        text: 'Leonardo da Vinci',
        isCorrect: true,
      },
      {
        text: 'Pablo Picasso',
        isCorrect: false,
      },
      {
        text: 'Claude Monet',
        isCorrect: false,
      },
    ],
  },
  {
    id: 15,
    question: 'Combien de côtés a un triangle ?',
    categorie: 'Mathématiques',
    answers: [
      {
        text: '3',
        isCorrect: true,
      },
      {
        text: '4',
        isCorrect: false,
      },
      {
        text: '5',
        isCorrect: false,
      },
      {
        text: '6',
        isCorrect: false,
      },
    ],
  },
  {
    id: 16,
    question: 'Quelle est la capitale du Canada ?',
    categorie: 'Géographie',
    answers: [
      {
        text: 'Toronto',
        isCorrect: false,
      },
      {
        text: 'Montréal',
        isCorrect: false,
      },
      {
        text: 'Ottawa',
        isCorrect: true,
      },
      {
        text: 'Vancouver',
        isCorrect: false,
      },
    ],
  },
  {
    id: 17,
    question: 'Quel est le plus grand fleuve du monde ?',
    categorie: 'Géographie',
    answers: [
      {
        text: 'Nil',
        isCorrect: false,
      },
      {
        text: 'Mississippi',
        isCorrect: false,
      },
      {
        text: 'Yangtsé',
        isCorrect: false,
      },
      {
        text: 'Amazone',
        isCorrect: true,
      },
    ],
  },
  {
    id: 18,
    question: 'Qui a écrit "Roméo et Juliette" ?',
    categorie: 'Littérature',
    answers: [
      {
        text: 'William Shakespeare',
        isCorrect: true,
      },
      {
        text: 'Jane Austen',
        isCorrect: false,
      },
      {
        text: 'Leo Tolstoy',
        isCorrect: false,
      },
      {
        text: 'Charles Dickens',
        isCorrect: false,
      },
    ],
  },
  {
    id: 19,
    question: "Quelle est la monnaie de l'Australie ?",
    categorie: 'Géographie',
    answers: [
      {
        text: 'Dollar américain',
        isCorrect: false,
      },
      {
        text: 'Euro',
        isCorrect: false,
      },
      {
        text: 'Dollar australien',
        isCorrect: true,
      },
      {
        text: 'Livres sterling',
        isCorrect: false,
      },
    ],
  },
  {
    id: 20,
    question: "Qui a inventé l'ordinateur personnel ?",
    categorie: 'Inventions',
    answers: [
      {
        text: 'Bill Gates',
        isCorrect: false,
      },
      {
        text: 'Steve Jobs',
        isCorrect: false,
      },
      {
        text: 'Alan Turing',
        isCorrect: false,
      },
      {
        text: 'IBM',
        isCorrect: true,
      },
    ],
  },
  {
    id: 21,
    question: 'Quelle est la capitale du Japon ?',
    categorie: 'Géographie',
    answers: [
      {
        text: 'Pékin',
        isCorrect: false,
      },
      {
        text: 'Séoul',
        isCorrect: false,
      },
      {
        text: 'Tokyo',
        isCorrect: true,
      },
      {
        text: 'Bangkok',
        isCorrect: false,
      },
    ],
  },
  {
    id: 22,
    question: 'Qui a écrit "Hamlet" ?',
    categorie: 'Littérature',
    answers: [
      {
        text: 'Charles Dickens',
        isCorrect: false,
      },
      {
        text: 'William Shakespeare',
        isCorrect: true,
      },
      {
        text: 'Jane Austen',
        isCorrect: false,
      },
      {
        text: 'F. Scott Fitzgerald',
        isCorrect: false,
      },
    ],
  },
  {
    id: 23,
    question: 'Quel est le plus grand océan du monde ?',
    categorie: 'Géographie',
    answers: [
      {
        text: 'Océan Atlantique',
        isCorrect: false,
      },
      {
        text: 'Océan Arctique',
        isCorrect: false,
      },
      {
        text: 'Océan Indien',
        isCorrect: false,
      },
      {
        text: 'Océan Pacifique',
        isCorrect: true,
      },
    ],
  },
  {
    id: 24,
    question: 'Combien de continents y a-t-il sur Terre ?',
    categorie: 'Géographie',
    answers: [
      {
        text: '5',
        isCorrect: false,
      },
      {
        text: '6',
        isCorrect: false,
      },
      {
        text: '7',
        isCorrect: true,
      },
      {
        text: '8',
        isCorrect: false,
      },
    ],
  },
  {
    id: 26,
    question: 'Quel est le plus haut sommet du monde ?',
    categorie: 'Géographie',
    answers: [
      {
        text: 'Mont Kilimandjaro',
        isCorrect: false,
      },
      {
        text: 'Mont Everest',
        isCorrect: true,
      },
      {
        text: 'Mont McKinley',
        isCorrect: false,
      },
      {
        text: 'Mont Fuji',
        isCorrect: false,
      },
    ],
  },
  {
    id: 27,
    question: 'Quelle est la monnaie du Japon ?',
    categorie: 'Géographie',
    answers: [
      {
        text: 'Won',
        isCorrect: false,
      },
      {
        text: 'Yuan',
        isCorrect: false,
      },
      {
        text: 'Yen',
        isCorrect: true,
      },
      {
        text: 'Ringgit',
        isCorrect: false,
      },
    ],
  },
  {
    id: 28,
    question: 'Qui a découvert la pénicilline ?',
    categorie: 'Science',
    answers: [
      {
        text: 'Marie Curie',
        isCorrect: false,
      },
      {
        text: 'Alexander Fleming',
        isCorrect: true,
      },
      {
        text: 'Louis Pasteur',
        isCorrect: false,
      },
      {
        text: 'Gregor Mendel',
        isCorrect: false,
      },
    ],
  },
  {
    id: 29,
    question: 'Quel est le plus grand mammifère marin ?',
    categorie: 'Biologie',
    answers: [
      {
        text: 'Orque',
        isCorrect: false,
      },
      {
        text: 'Baleine à bosse',
        isCorrect: false,
      },
      {
        text: 'Baleine bleue',
        isCorrect: true,
      },
      {
        text: 'Dauphin',
        isCorrect: false,
      },
    ],
  },
  {
    id: 30,
    question: 'Qui a écrit "Les Misérables" ?',
    categorie: 'Littérature',
    answers: [
      {
        text: 'Victor Hugo',
        isCorrect: true,
      },
      {
        text: 'Leo Tolstoy',
        isCorrect: false,
      },
      {
        text: 'Charles Dickens',
        isCorrect: false,
      },
      {
        text: 'Jane Austen',
        isCorrect: false,
      },
    ],
  },
  {
    id: 31,
    question: 'Quelle est la capitale du Brésil ?',
    categorie: 'Géographie',
    answers: [
      {
        text: 'Buenos Aires',
        isCorrect: false,
      },
      {
        text: 'Lima',
        isCorrect: false,
      },
      {
        text: 'Rio de Janeiro',
        isCorrect: false,
      },
      {
        text: 'Brasília',
        isCorrect: true,
      },
    ],
  },
  {
    id: 32,
    question: 'Quel est le plus grand lac du monde ?',
    categorie: 'Géographie',
    answers: [
      {
        text: 'Lac Supérieur',
        isCorrect: false,
      },
      {
        text: 'Lac Baïkal',
        isCorrect: true,
      },
      {
        text: 'Lac Michigan',
        isCorrect: false,
      },
      {
        text: 'Lac de Garde',
        isCorrect: false,
      },
    ],
  },
  {
    id: 33,
    question: 'Qui a conçu la première ampoule électrique ?',
    categorie: 'Inventions',
    answers: [
      {
        text: 'Thomas Edison',
        isCorrect: true,
      },
      {
        text: 'Nikola Tesla',
        isCorrect: false,
      },
      {
        text: 'Alexander Graham Bell',
        isCorrect: false,
      },
      {
        text: 'Benjamin Franklin',
        isCorrect: false,
      },
    ],
  },
  {
    id: 34,
    question: 'Quel est le plus grand désert froid du monde ?',
    categorie: 'Géographie',
    answers: [
      {
        text: 'Désert de Gobi',
        isCorrect: false,
      },
      {
        text: 'Désert du Sahara',
        isCorrect: false,
      },
      {
        text: "Désert d'Atacama",
        isCorrect: false,
      },
      {
        text: 'Antarctique',
        isCorrect: true,
      },
    ],
  },
  {
    id: 35,
    question: 'Qui a peint "La Nuit étoilée" ?',
    categorie: 'Art',
    answers: [
      {
        text: 'Pablo Picasso',
        isCorrect: false,
      },
      {
        text: 'Claude Monet',
        isCorrect: false,
      },
      {
        text: 'Vincent van Gogh',
        isCorrect: true,
      },
      {
        text: 'Leonardo da Vinci',
        isCorrect: false,
      },
    ],
  },
];
