/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
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

function deleteOneQuestion(id) {
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
  console.log('20 question model');

  const count = 20;
  const quizz = parse(jsonDbPath, defaultQuizz);

  console.log(`nb de toute les question ${quizz.length}`);
  console.log(categories);

  // eslint-disable-next-line no-confusing-arrow
  const filteredQuestions = quizz.filter((question) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    !categories ? true : categories.includes(question.categorie));

  console.log(`taille possible question ${filteredQuestions.length}`);

  if (filteredQuestions.length < count) {
    throw new Error('Pas assez de questions dans les catégories spécifiées.');
  }
  const selectedQuestions = [];

  // eslint-disable-next-line no-plusplus
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
  deleteOneQuestion,
  updateOneQuestion,
  read20Questions,
};

const defaultQuizz = [
  {
    id: 1,
    question: 'Un nombre exclusivement positif est un...',
    categorie: 'Mathématiques',
    answers: [
      {
        text: 'Nombre réel',
        isCorrect: false,
      },
      {
        text: 'Nombre naturel',
        isCorrect: false,
      },
      {
        text: 'Nombre entier',
        isCorrect: true,
      },
      {
        text: 'Nombre rationnel',
        isCorrect: false,
      },
    ],
  },
  {
    id: 2,
    question: 'Quelle est la bonne écriture de Pi',
    categorie: 'Mathématiques',
    answers: [
      {
        text: '3,1415',
        isCorrect: true,
      },
      {
        text: '3,1492',
        isCorrect: false,
      },
      {
        text: '3,1465',
        isCorrect: false,
      },
      {
        text: '3,1592',
        isCorrect: false,
      },
    ],
  },
  {
    id: 3,
    question: "Quelle est la capitale du Maroc ?",
    categorie: 'Géographie',
    answers: [
      {
        text: 'Casablanca',
        isCorrect: false,
      },
      {
        text: 'Marrakech',
        isCorrect: false,
      },
      {
        text: 'Rabat',
        isCorrect: true,
      },
      {
        text: 'Agadir',
        isCorrect: false,
      },
    ],
  },
  {
    id: 4,
    question: 'Comment appelle-t-on une figure avec 14 cotés ?',
    categorie: 'Mathématiques',
    answers: [
      {
        text: 'Tétradécagone',
        isCorrect: true,
      },
      {
        text: 'Hexadécagone',
        isCorrect: false,
      },
      {
        text: 'Dodécagone',
        isCorrect: false,
      },
      {
        text: 'Octodécagone',
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
    question: 'Quel artiste musical a vendu le plus de disques de tout les temps ?',
    categorie: 'Art',
    answers: [
      {
        text: 'Madonna',
        isCorrect: false,
      },
      {
        text: 'Elvis Presley',
        isCorrect: true,
      },
      {
        text: 'Mickael Jackson',
        isCorrect: false,
      },
      {
        text: 'John Lennon',
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
question: 'Combien de pays y a-t-il en Afrique ?',
categorie: 'Géographie',
answers: [
  {
    text: '39',
    isCorrect: false,
  },
  {
    text: '43',
    isCorrect: false,
  },
  {
    text: '54',
    isCorrect: true,
  },
  {
    text: '49',
    isCorrect: false
  }
]
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
    id: 2,
question: 'Quel est le plus grand pays Asiatique ?',
categorie: 'Géographie',
answers: [
  {
    text: 'Chine',
    isCorrect: false,
  },
  {
    text: 'Russie',
    isCorrect: true,
  },
  {
    text: 'Inde',
    isCorrect: false,
  },
  {
    text: 'Japon',
    isCorrect: false
  }
]
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
  {
    id: 36,
    question: 'Comment appelle t-on les habitants du Liechtenstein',
    categorie: 'Géographie',
    answers: [
      {
        text: 'Liechtensteinais',
        isCorrect: false,
      },
      {
        text: 'Liechtensteiniens',
        isCorrect: false,
      },
      {
        text: 'Liechtensteinois',
        isCorrect: true,
      },
      {
        text: 'Liechtenstois',
        isCorrect: false,
      },
    ],
  },
  {
    id: 37,
    question: 'Tegucigalpa est la capitale de ... ?',
    categorie: 'Géographie',
    answers: [
      {
        text: 'Nicaragua',
        isCorrect: false,
      },
      {
        text: 'Venezuela',
        isCorrect: false,
      },
      {
        text: 'Honduras',
        isCorrect: true,
      },
      {
        text: 'Bolivie',
        isCorrect: false,
      },
    ],
  },
  {
    id: 38,
    question: 'Quel opays a subit le plus de tremblements de terre les 30 dernières années ?',
    categorie: 'Géographie',
    answers: [
      {
        text: 'Iran',
        isCorrect: false,
      },
      {
        text: 'Japon',
        isCorrect: false,
      },
      {
        text: 'Indonésie',
        isCorrect: false,
      },
      {
        text: 'Chine',
        isCorrect: true,
      },
    ],
  },
  {
    id: 39,
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
    id: 40,
    question: `Quelle est la formule pour calculer la densité d'un objet ?`,
    categorie: 'Mathématiques',
    answers: [
  {
    text: 'Densité = Masse / Volume',
    isCorrect: true,
  },
  {
    text: 'Densité = Volume / Masse',
    isCorrect: false,
  },
  {
    text: 'Densité = Force / Surface',
    isCorrect: false,
  },
  {
    text: 'Densité = Pression / Volume',
    isCorrect: false
  }
 ],
},
{
  id: 41,
  question: 'Quel est le plus petit nombre premier ?',
  categorie: 'Mathématiques',
  answers: [
    {
      text: '2',
      isCorrect: true,
    },
    {
      text: '1',
      isCorrect: false,
    },
    {
      text: '3',
      isCorrect: false,
    },
    {
      text: '5',
      isCorrect: false
    }
  ],
},
{
  id: 42,
question: 'Quel est le plus petit élément chimique ?',
categorie: 'Mathématiques',
answers: [
  {
    text: 'Azote',
    isCorrect: false,
  },
  {
    text: 'Oxygène',
    isCorrect: false,
  },
  {
    text: 'Hydrogène',
    isCorrect: true,
  },
  {
    text: 'Carbone',
    isCorrect: false
  }
 ],
},
{
  id: 43,
  question: 'Quelle musique à le plus de vues sur YouTube ?',
  categorie: 'Art',
  answers: [
    {
      text: 'PSY - GANGNAM STYLE ',
      isCorrect: false,
    },
    {
      text: 'PINKFONG - Baby Shark',
      isCorrect: true,
    },
    {
      text: 'Luis Fonsi - Despacito ft. Daddy Yankee',
      isCorrect: false,
    },
    {
      text: 'Wiz Khalifa - See You Again ft. Charlie Puth',
      isCorrect: false,
    },
  ],
},
{
  id: 44,
  question: 'Quelle est la musique la plus vendue de tous les temps ?',
  categorie: 'Art',
  answers: [
    {
      text: 'Queen - Dont stop me now',
      isCorrect: false,
    },
    {
      text: 'Queen - Bohemian Rhapsody',
      isCorrect: false,
    },
    {
      text: 'Mickael Jackson - Billie Jean',
      isCorrect: false,
    },
    {
      text: 'Mickael Jackson - Thriller',
      isCorrect: true,
    },
  ],
},
{
  id: 45,
  question: 'Comment est fabriqué le bronze',
  categorie: 'Art',
  answers: [
    {
      text: 'Cuivre + Etain',
      isCorrect: true,
    },
    {
      text: 'Cuivre + Zinc + Etain',
      isCorrect: false,
    },
    {
      text: 'Cuivre + Zinc',
      isCorrect: false,
    },
    {
      text: 'Zinc + Etain',
      isCorrect: false,
    },
  ],
},
{
  id: 46,
  question: 'Quelle couleur était Hulk dans les premier comics',
  categorie: 'Littérature',
  answers: [
    {
      text: 'Noir',
      isCorrect: false,
    },
    {
      text: 'Gris',
      isCorrect: true,
    },
    {
      text: 'Rouge',
      isCorrect: false,
    },
    {
      text: 'Vert',
      isCorrect: false,
    },
  ],
},
{
  id: 47,
question: 'Dans le roman "Madame Bovary" de Gustave Flaubert, quel est le nom du personnage principal ?',
categorie: 'Littérature',
answers: [
  {
    text: 'Emma Bovary',
    isCorrect: true,
  },
  {
    text: 'Charles Bovary',
    isCorrect: false,
  },
  {
    text: 'Léon Dupuis',
    isCorrect: false,
  },
  {
    text: 'Rodolphe Boulanger',
    isCorrect: false
  },
 ],
},
{
  id: 48,
question: 'Dans le roman "Les Misérables" de Victor Hugo, quel est le nom du personnage principal ?',
categorie: 'Littérature',
answers: [
  {
    text: 'Jean Valjean',
    isCorrect: true,
  },
  {
    text: 'Javert',
    isCorrect: false,
  },
  {
    text: 'Cosette',
    isCorrect: false,
  },
  {
    text: 'Fantine',
    isCorrect: false
  },
 ],
},
{
  id: 49,
question: 'Dans le roman "Le Petit Prince" d\'Antoine de Saint-Exupéry, quelle est la planète d\'origine du Petit Prince ?',
categorie: 'Littérature',
answers: [
  {
    text: 'Aquaeous A230C',
    isCorrect: false,
  },
  {
    text: 'Myriad III',
    isCorrect: false,
  },
  {
    text: 'Frion I',
    isCorrect: false,
  },
  {
    text: 'Asteroid B-612',
    isCorrect: true
  },
 ],
},
{
  id: 50,
question: 'Dans Naruto, comment sappelle le frère de Sasuke ?',
categorie: 'Littérature',
answers: [
  {
    text: 'Kakashi',
    isCorrect: false,
  },
  {
    text: 'Shikamaru',
    isCorrect: false,
  },
  {
    text: 'Itachi',
    isCorrect: true,
  },
  {
    text: 'Madara',
    isCorrect: false
  },
 ],
},
{
  id: 51,
question: 'A qui appartient la célèbre phrase : "ZA WARUDO"',
categorie: 'Littérature',
answers: [
  {
    text: 'Luffy',
    isCorrect: false,
  },
  {
    text: 'Jotaro Kujo',
    isCorrect: false,
  },
  {
    text: 'Dio Brando',
    isCorrect: true,
  },
  {
    text: 'Sangoku',
    isCorrect: false
  },
 ],
},

];
