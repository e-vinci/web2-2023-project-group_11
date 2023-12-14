/* eslint-disable indent */
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
    question: 'Quelle est la capitale du Maroc ?',
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
    question: 'Quelle est la capitale de la Chine?',
    categorie: 'Géographie',
    answers: [
      {
        text: 'Pékin',
        isCorrect: true,
      },
      {
        text: 'Séoul',
        isCorrect: false,
      },
      {
        text: 'Tokyo',
        isCorrect: false,
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
    question: 'Quel pays a subit le plus de tremblements de terre les 30 dernières années ?',
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
    question: 'Quelle est la formule pour calculer la densité pour un objet ?',
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
        isCorrect: false,
      },
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
        isCorrect: false,
      },
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
        isCorrect: false,
      },
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
    question:
      'Dans le roman "Madame Bovary" de Gustave Flaubert, quel est le nom du personnage principal ?',
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
        isCorrect: false,
      },
    ],
  },
  {
    id: 48,
    question:
      'Dans le roman "Les Misérables" de Victor Hugo, quel est le nom du personnage principal ?',
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
        isCorrect: false,
      },
    ],
  },
  {
    id: 49,
    question:
      'Dans le roman "Le Petit Prince" d\'Antoine de Saint-Exupéry, quelle est la planète d\'origine du Petit Prince ?',
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
        isCorrect: true,
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
        isCorrect: false,
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
        isCorrect: false,
      },
    ],
  },
  {
    id: 52,
    question: 'Quel est le premier pokémon à avoir été imaginé par son créateur',
    categorie: 'Littérature',
    answers: [
      {
        text: 'Pikachu',
        isCorrect: false,
      },
      {
        text: 'Evoli',
        isCorrect: false,
      },
      {
        text: 'Rhinocorne',
        isCorrect: true,
      },
      {
        text: 'Mewtwo',
        isCorrect: false,
      },
    ],
  },
  {
    id: 53,
    question: 'Quel est le 5ème tome de la saga Harry Potter',
    categorie: 'Littérature',
    answers: [
      {
        text: 'Les Reliques de la Mort',
        isCorrect: false,
      },
      {
        text: 'Le Prince de sang-mêlé',
        isCorrect: false,
      },
      {
        text: 'La coupe de feu',
        isCorrect: false,
      },
      {
        text: 'L´ordre du Phénix',
        isCorrect: true,
      },
    ],
  },
  {
    id: 54,
    question: 'Qui vit dans un ananas dans la mer ?',
    categorie: 'Art',
    answers: [
      {
        text: 'Bob l´éponge carré',
        isCorrect: true,
      },
      {
        text: 'Patrick l´étoile de mer',
        isCorrect: false,
      },
      {
        text: 'Carlo le calamar',
        isCorrect: false,
      },
      {
        text: 'Plankton le plancton',
        isCorrect: true,
      },
    ],
  },
  {
    id: 55,
    question: 'Comment appelle-t-on un sol gelé en permanence',
    categorie: 'Géographie',
    answers: [
      {
        text: 'La banquise',
        isCorrect: false,
      },
      {
        text: 'Une calotte glacière',
        isCorrect: false,
      },
      {
        text: 'Un iceberg',
        isCorrect: false,
      },
      {
        text: 'Le permafrost',
        isCorrect: true,
      },
    ],
  },
  {
    id: 56,
    question: 'Quel est l´unique pays possèdant des autoroutes sans limitations de vitesse ?',
    categorie: 'Géographie',
    answers: [
      {
        text: 'Les Etats-Unis',
        isCorrect: false,
      },
      {
        text: 'La Russie',
        isCorrect: false,
      },
      {
        text: 'L´allemagne',
        isCorrect: true,
      },
      {
        text: 'L´albanie',
        isCorrect: false,
      },
    ],
  },
  {
    id: 57,
    question: 'Charon est une lune de...',
    categorie: 'Astronomie',
    answers: [
      {
        text: 'Jupiter',
        isCorrect: false,
      },
      {
        text: 'Vénus',
        isCorrect: false,
      },
      {
        text: 'Mercure',
        isCorrect: false,
      },
      {
        text: 'Pluton',
        isCorrect: true,
      },
    ],
  },
  {
    id: 58,
    question: 'Le soleil est une...',
    categorie: 'Astronomie',
    answers: [
      {
        text: 'Naine brune',
        isCorrect: false,
      },
      {
        text: 'Naine jaune',
        isCorrect: true,
      },
      {
        text: 'Naine blanche',
        isCorrect: false,
      },
      {
        text: 'Naine rouge',
        isCorrect: false,
      },
    ],
  },
  {
    id: 59,
    question: 'Quelle est la galaxie la plus proche de la notre',
    categorie: 'Astronomie',
    answers: [
      {
        text: 'Nebulos',
        isCorrect: false,
      },
      {
        text: 'Omega centauri',
        isCorrect: false,
      },
      {
        text: 'Sirius black',
        isCorrect: false,
      },
      {
        text: 'Andromède',
        isCorrect: true,
      },
    ],
  },
  {
    id: 60,
    question: 'Quelle planète est connue comme la "planète rouge"?',
    categorie: 'Astronomie',
    answers: [
      {
        text: 'Vénus',
        isCorrect: false,
      },
      {
        text: 'Jupiter',
        isCorrect: false,
      },
      {
        text: 'Mars',
        isCorrect: true,
      },
      {
        text: 'Saturne',
        isCorrect: false,
      },
    ],
  },
  {
    id: 61,
    question: 'Quelle est la plus grande lune de Jupiter?',
    categorie: 'Astronomie',
    answers: [
      {
        text: 'Io',
        isCorrect: false,
      },
      {
        text: 'Europe',
        isCorrect: false,
      },
      {
        text: 'Callisto',
        isCorrect: true,
      },
      {
        text: 'Ganymède',
        isCorrect: false,
      },
    ],
  },
  {
    id: 62,
    question: 'Quelle étoile est au centre de notre système solaire?',
    categorie: 'Astronomie',
    answers: [
      {
        text: 'Véga',
        isCorrect: false,
      },
      {
        text: 'Alpha Centauri',
        isCorrect: false,
      },
      {
        text: 'Proxima Centauri',
        isCorrect: false,
      },
      {
        text: 'Le Soleil',
        isCorrect: true,
      },
    ],
  },
  {
    id: 63,
    question: 'Quelle est la première planète du système solaire?',
    categorie: 'Astronomie',
    answers: [
      {
        text: 'Mercure',
        isCorrect: true,
      },
      {
        text: 'Vénus',
        isCorrect: false,
      },
      {
        text: 'Terre',
        isCorrect: false,
      },
      {
        text: 'Mars',
        isCorrect: false,
      },
    ],
  },
  {
    id: 64,
    question: 'Qu´est-ce qu´une éclipse solaire?',
    categorie: 'Astronomie',
    answers: [
      {
        text: 'Lorsqu´une planète passe devant une étoile',
        isCorrect: false,
      },
      {
        text: 'Lorsque la Lune passe devant le Soleil',
        isCorrect: true,
      },
      {
        text: 'Lorsque le soleil passe devant la lune',
        isCorrect: false,
      },
      {
        text: 'Lorsque deux planètes entrent en conjonction solaire',
        isCorrect: false,
      },
    ],
  },
  {
    id: 65,
    question: 'Quelle est la distance moyenne entre la Terre et le Soleil?',
    categorie: 'Astronomie',
    answers: [
      {
        text: '10 millions de kilomètres',
        isCorrect: false,
      },
      {
        text: '150 millions de kilomètres',
        isCorrect: true,
      },
      {
        text: '60 millions de kilomètres',
        isCorrect: false,
      },
      {
        text: '100 millions de kilomètres',
        isCorrect: false,
      },
    ],
  },
  {
    id: 66,
    question: 'Quelle est la durée d´une journée sur Mars?',
    categorie: 'Astronomie',
    answers: [
      {
        text: '24 heures et 8 minutes',
        isCorrect: false,
      },
      {
        text: '25 heures et 7 minutes',
        isCorrect: false,
      },
      {
        text: '25 heures et 52 minutes',
        isCorrect: false,
      },
      {
        text: '24 heures et 37 minutes',
        isCorrect: true,
      },
    ],
  },
  {
    id: 67,
    question: 'Quelle est la plus grande planète du système solaire?',
    categorie: 'Astronomie',
    answers: [
      {
        text: 'Neptune',
        isCorrect: false,
      },
      {
        text: 'Uranus',
        isCorrect: false,
      },
      {
        text: 'Jupiter',
        isCorrect: true,
      },
      {
        text: 'Saturne',
        isCorrect: false,
      },
    ],
  },
  {
    id: 68,
    question: 'Quel est le nom de la première station spatiale lancée par l´Union soviétique?',
    categorie: 'Astronomie',
    answers: [
      {
        text: 'Hubble',
        isCorrect: false,
      },
      {
        text: 'Mir',
        isCorrect: true,
      },
      {
        text: 'Spoutnik',
        isCorrect: false,
      },
      {
        text: 'Apollo',
        isCorrect: false,
      },
    ],
  },
  {
    id: 69,
    question: 'Quelle est la plus petite planète du système solaire?',
    categorie: 'Astronomie',
    answers: [
      {
        text: 'Vénus',
        isCorrect: false,
      },
      {
        text: 'Pluton',
        isCorrect: false,
      },
      {
        text: 'Mars',
        isCorrect: false,
      },
      {
        text: 'Mercure',
        isCorrect: true,
      },
    ],
  },
  {
    id: 70,
    question: 'Qu´est-ce qu´une supernova?',
    categorie: 'Astronomie',
    answers: [
      {
        text: 'Une formation de trou noir',
        isCorrect: false,
      },
      {
        text: 'Une étoile en fin de vie qui explose de manière spectaculaire',
        isCorrect: true,
      },
      {
        text: 'Colision entre deux étoiles',
        isCorrect: false,
      },
      {
        text: 'Un trou noir qui meurt',
        isCorrect: false,
      },
    ],
  },
  {
    id: 71,
    question: 'Quel est le nom du premier satellite artificiel lancé dans l´espace?',
    categorie: 'Astronomie',
    answers: [
      {
        text: 'Apollo 11',
        isCorrect: false,
      },
      {
        text: 'Vostok 1',
        isCorrect: true,
      },
      {
        text: 'Sputnik 1',
        isCorrect: false,
      },
      {
        text: 'Explorer 1',
        isCorrect: false,
      },
    ],
  },
  {
    id: 72,
    question: 'Quelle est la distance entre la Terre et la Lune?',
    categorie: 'Astronomie',
    answers: [
      {
        text: '+-500 000 kilomètres',
        isCorrect: false,
      },
      {
        text: '+-200 000 kilomètres',
        isCorrect: false,
      },
      {
        text: '+-300 000 kilomètres',
        isCorrect: false,
      },
      {
        text: '+-400 000 kilomètres',
        isCorrect: true,
      },
    ],
  },
  {
    id: 73,
    question: 'Quel est le nom du télescope spatial lancé par la NASA en 1990?',
    categorie: 'Astronomie',
    answers: [
      {
        text: 'Kepler',
        isCorrect: false,
      },
      {
        text: 'Hubble',
        isCorrect: true,
      },
      {
        text: 'Chandra',
        isCorrect: false,
      },
      {
        text: 'Spitzer',
        isCorrect: false,
      },
    ],
  },
  {
    id: 74,
    question: 'Quelle est la période orbitale de Pluton?',
    categorie: 'Astronomie',
    answers: [
      {
        text: '88 ans',
        isCorrect: false,
      },
      {
        text: '4 ans',
        isCorrect: false,
      },
      {
        text: '42 ans',
        isCorrect: false,
      },
      {
        text: '248 ans',
        isCorrect: true,
      },
    ],
  },
  {
    id: 75,
    question:
      'Quel est le nom de la mission de la NASA qui a envoyé des astronautes sur la Lune pour la première fois en 1969?',
    categorie: 'Astronomie',
    answers: [
      {
        text: 'Apollo 11',
        isCorrect: true,
      },
      {
        text: 'Gemini 7',
        isCorrect: false,
      },
      {
        text: 'Mercury 13',
        isCorrect: false,
      },
      {
        text: 'Artemis 1',
        isCorrect: false,
      },
    ],
  },
  {
    id: 76,
    question: 'Quel est le nom du plus grand volcan du système solaire, situé sur Mars?',
    categorie: 'Astronomie',
    answers: [
      {
        text: 'Mauna Loa',
        isCorrect: false,
      },
      {
        text: 'Olympus Mons',
        isCorrect: true,
      },
      {
        text: 'Big chungus',
        isCorrect: false,
      },
      {
        text: 'Vesuvius',
        isCorrect: false,
      },
    ],
  },
  {
    id: 77,
    question: 'Quelle est la période de rotation de Jupiter sur son axe?',
    categorie: 'Astronomie',
    answers: [
      {
        text: '+-17 heures',
        isCorrect: false,
      },
      {
        text: '+-13 heures',
        isCorrect: false,
      },
      {
        text: '+-11 heures',
        isCorrect: false,
      },
      {
        text: '+-10 heures',
        isCorrect: true,
      },
    ],
  },
  {
    id: 78,
    question: 'Quelle est la constellation dans laquelle se trouve l´étoile polaire?',
    categorie: 'Astronomie',
    answers: [
      {
        text: 'Orion',
        isCorrect: false,
      },
      {
        text: 'Ursa Major',
        isCorrect: true,
      },
      {
        text: 'Cassiopeia',
        isCorrect: false,
      },
      {
        text: 'Cygnus',
        isCorrect: false,
      },
    ],
  },
  {
    id: 79,
    question: 'Qui a la priorité dans cette opération 2 : (2^2 x 6)^3',
    categorie: 'Mathématiques',
    answers: [
      {
        text: 'Le diviseur',
        isCorrect: false,
      },
      {
        text: 'La puissance de 2',
        isCorrect: true,
      },
      {
        text: 'L´opération dans la parenthèse',
        isCorrect: false,
      },
      {
        text: 'La puissance de 3',
        isCorrect: false,
      },
    ],
  },
  {
    id: 80,
    question: 'Quelle est la somme des angles intérieurs d´un triangle?',
    categorie: 'Mathématiques',
    answers: [
      {
        text: '90°',
        isCorrect: false,
      },
      {
        text: '180°',
        isCorrect: true,
      },
      {
        text: '360°',
        isCorrect: false,
      },
      {
        text: '270°',
        isCorrect: false,
      },
    ],
  },
  {
    id: 81,
    question: 'Quelle est la racine carrée de 144?',
    categorie: 'Mathématiques',
    answers: [
      {
        text: '10',
        isCorrect: false,
      },
      {
        text: '12',
        isCorrect: true,
      },
      {
        text: '14',
        isCorrect: false,
      },
      {
        text: '16',
        isCorrect: false,
      },
    ],
  },
  {
    id: 82,
    question: 'Quel est le nombre d´Euler (e) équivalent à environ 2,718?',
    categorie: 'Mathématiques',
    answers: [
      {
        text: '3.142',
        isCorrect: false,
      },
      {
        text: '2.718',
        isCorrect: true,
      },
      {
        text: '1.618',
        isCorrect: false,
      },
      {
        text: '4.669',
        isCorrect: false,
      },
    ],
  },
  {
    id: 83,
    question: 'Quelle est la formule pour calculer l´aire d´un cercle?',
    categorie: 'Mathématiques',
    answers: [
      {
        text: 'A = πr²',
        isCorrect: true,
      },
      {
        text: 'A = 2πr',
        isCorrect: false,
      },
      {
        text: 'A = ½ bh',
        isCorrect: false,
      },
      {
        text: 'A = a²',
        isCorrect: false,
      },
    ],
  },
  {
    d: 84,
    question: 'Quelle est la différence entre un nombre premier et un nombre composé?',
    categorie: 'Mathématiques',
    answers: [
      {
        text:
          'Un nombre premier est divisible par 1 et lui-même, tandis qu´un nombre composé a d´autres diviseurs en plus de 1 et lui-même.',
        isCorrect: true,
      },
      {
        text: 'Un nombre premier est plus grand qu´un nombre composé.',
        isCorrect: false,
      },
      {
        text:
          'Un nombre premier est toujours pair, tandis qu´un nombre composé est toujours impair.',
        isCorrect: false,
      },
      {
        text:
          'Un nombre composé est divisible par 1 et lui-même, tandis qu´un nombre premier a d´autres diviseurs en plus de 1 et lui-même.',
        isCorrect: false,
      },
    ],
  },
  {
    id: 85,
    question: 'Quelle est la somme des angles d´un hexagone?',
    categorie: 'Mathématiques',
    answers: [
      {
        text: '540°',
        isCorrect: true,
      },
      {
        text: '360°',
        isCorrect: false,
      },
      {
        text: '720°',
        isCorrect: false,
      },
      {
        text: '450°',
        isCorrect: false,
      },
    ],
  },
  {
    id: 86,
    question: 'Quelle est la valeur de sin(90°)?',
    categorie: 'Mathématiques',
    answers: [
      {
        text: '0',
        isCorrect: false,
      },
      {
        text: '1',
        isCorrect: true,
      },
      {
        text: 'Indéfini',
        isCorrect: false,
      },
      {
        text: '1/4',
        isCorrect: false,
      },
    ],
  },
  {
    id: 87,
    question: 'Quel est le théorème de Pythagore?',
    categorie: 'Mathématiques',
    answers: [
      {
        text: 'a² = b² + c²',
        isCorrect: true,
      },
      {
        text: 'a² + b² = c²',
        isCorrect: false,
      },
      {
        text: 'a + b + c = 180°',
        isCorrect: false,
      },
      {
        text: 'A = πr²',
        isCorrect: false,
      },
    ],
  },
  {
    id: 88,
    question: 'Quelle est la valeur de cos(0°)?',
    categorie: 'Mathématiques',
    answers: [
      {
        text: '0',
        isCorrect: true,
      },
      {
        text: '1',
        isCorrect: false,
      },
      {
        text: '0.5',
        isCorrect: false,
      },
      {
        text: 'Indéfini',
        isCorrect: false,
      },
    ],
  },
  {
    id: 89,
    question: 'Quel est le nombre d´or, souvent représenté par la lettre grecque φ?',
    categorie: 'Mathématiques',
    answers: [
      {
        text: '3.142',
        isCorrect: false,
      },
      {
        text: '2.718',
        isCorrect: false,
      },
      {
        text: '1.618',
        isCorrect: true,
      },
      {
        text: '4.669',
        isCorrect: false,
      },
    ],
  },
  {
    id: 90,
    question: 'Quel est le volume d´un cube de côté 3 unités?',
    categorie: 'Mathématiques',
    answers: [
      {
        text: '9 unités cubes',
        isCorrect: false,
      },
      {
        text: '18 unités cubes',
        isCorrect: false,
      },
      {
        text: '27 unités cubes',
        isCorrect: true,
      },
      {
        text: '36 unités cubes',
        isCorrect: false,
      },
    ],
  },
  {
    id: 92,
    question: 'Quelle est la règle des signes pour la multiplication?',
    categorie: 'Mathématiques',
    answers: [
      {
        text: '(-) x (+) = (x)',
        isCorrect: false,
      },
      {
        text: '(+) x (-) = (+)',
        isCorrect: true,
      },
      {
        text: '(-) x (-) = (+)',
        isCorrect: false,
      },
      {
        text: '(+) x (+) = (-)',
        isCorrect: false,
      },
    ],
  },
  {
    id: 93,
    question: 'Quel est le nombre entier le plus proche de √25?',
    categorie: 'Mathématiques',
    answers: [
      {
        text: '4',
        isCorrect: false,
      },
      {
        text: '5',
        isCorrect: true,
      },
      {
        text: '6',
        isCorrect: false,
      },
      {
        text: '7',
        isCorrect: false,
      },
    ],
  },
  {
    id: 91,
    question: 'Quel est le produit de 8 et de son inverse multiplicatif?',
    categorie: 'Mathématiques',
    answers: [
      {
        text: '1',
        isCorrect: true,
      },
      {
        text: '0',
        isCorrect: false,
      },
      {
        text: '8',
        isCorrect: false,
      },
      {
        text: '64',
        isCorrect: false,
      },
    ],
  },
  {
    id: 96,
    question: 'Quel est le nom de la fonction trigonométrique opposée au cosinus?',
    categorie: 'Mathématiques',
    answers: [
      {
        text: 'Tangente',
        isCorrect: false,
      },
      {
        text: 'Sécante',
        isCorrect: false,
      },
      {
        text: 'Cotangente',
        isCorrect: true,
      },
      {
        text: 'Sinus',
        isCorrect: false,
      },
    ],
  },
  {
    id: 97,
    question: 'Quelle est la somme des angles d´un octogone?',
    categorie: 'Mathématiques',
    answers: [
      {
        text: '1080°',
        isCorrect: false,
      },
      {
        text: '720°',
        isCorrect: true,
      },
      {
        text: '1440°',
        isCorrect: false,
      },
      {
        text: '900°',
        isCorrect: false,
      },
    ],
  },
  {
    id: 94,
    question: 'Quelle est la formule pour calculer le volume d´un cylindre?',
    categorie: 'Mathématiques',
    answers: [
      {
        text: 'V = πr²h',
        isCorrect: true,
      },
      {
        text: 'V = ½ bh',
        isCorrect: false,
      },
      {
        text: 'V = lwh',
        isCorrect: false,
      },
      {
        text: 'V = 4/3πr³',
        isCorrect: false,
      },
    ],
  },
  {
    id: 98,
    question: 'Quel auteur a écrit "Le Seigneur des Anneaux"?',
    categorie: 'Littérature',
    answers: [
      {
        text: 'J.K. Rowling',
        isCorrect: false,
      },
      {
        text: 'George Orwell',
        isCorrect: false,
      },
      {
        text: 'J.R.R. Tolkien',
        isCorrect: true,
      },
      {
        text: 'C.S. Lewis',
        isCorrect: false,
      },
    ],
  },
  {
    id: 99,
    question: 'Quel est le titre du premier livre de la série "Harry Potter"?',
    categorie: 'Littérature',
    answers: [
      {
        text: 'Harry Potter et la Chambre des secrets',
        isCorrect: false,
      },
      {
        text: 'Harry Potter et la Coupe de feu',
        isCorrect: false,
      },
      {
        text: 'Harry Potter à l´école des sorciers',
        isCorrect: true,
      },
      {
        text: 'Harry Potter et le Prisonnier d´Azkaban',
        isCorrect: false,
      },
    ],
  },
  {
    id: 100,
    question: 'Qui est l´auteur de la série de romans "Game of Thrones"?',
    categorie: 'Littérature',
    answers: [
      {
        text: 'J.R.R. Tolkien',
        isCorrect: false,
      },
      {
        text: 'J.K. Rowling',
        isCorrect: false,
      },
      {
        text: 'George R.R. Martin',
        isCorrect: true,
      },
      {
        text: 'C.S. Lewis',
        isCorrect: false,
      },
    ],
  },
  {
    id: 101,
    question: 'Quelle est la série de bandes dessinées mettant en scène Tintin, créée par Hergé?',
    categorie: 'Littérature',
    answers: [
      {
        text: 'Tintin et Milou',
        isCorrect: false,
      },
      {
        text: 'Les Aventures de Tintin et Milou',
        isCorrect: false,
      },
      {
        text: 'Tintin',
        isCorrect: false,
      },
      {
        text: 'Les Aventures de Tintin',
        isCorrect: true,
      },
    ],
  },
  {
    id: 102,
    question: 'Qui est l´auteur du roman "Les Misérables"?',
    categorie: 'Littérature',
    answers: [
      {
        text: 'Charles Dickens',
        isCorrect: false,
      },
      {
        text: 'Victor Hugo',
        isCorrect: true,
      },
      {
        text: 'Leo Tolstoï',
        isCorrect: false,
      },
      {
        text: 'Fyodor Dostoevsky',
        isCorrect: false,
      },
    ],
  },
  {
    id: 103,
    question:
      'Quelle est la série de bandes dessinées belge créée par Morris, mettant en scène un/des cow-boy?',
    categorie: 'Littérature',
    answers: [
      {
        text: 'Asterix',
        isCorrect: false,
      },
      {
        text: 'Les daltons',
        isCorrect: false,
      },
      {
        text: 'Lucky Luke',
        isCorrect: true,
      },
      {
        text: 'Blake et Mortimer',
        isCorrect: false,
      },
    ],
  },
  {
    id: 104,
    question:
      'Quel est le manga écrit et illustré par Akira Toriyama, racontant les aventures de Son Goku?',
    categorie: 'Littérature',
    answers: [
      {
        text: 'Naruto',
        isCorrect: false,
      },
      {
        text: 'One Piece',
        isCorrect: false,
      },
      {
        text: 'Dragon Ball',
        isCorrect: true,
      },
      {
        text: 'Death Note',
        isCorrect: false,
      },
    ],
  },
  {
    id: 105,
    question: 'Qui est l´auteur du roman "1984"?',
    categorie: 'Littérature',
    answers: [
      {
        text: 'Aldous Huxley',
        isCorrect: false,
      },
      {
        text: 'George Orwell',
        isCorrect: true,
      },
      {
        text: 'Ray Bradbury',
        isCorrect: false,
      },
      {
        text: 'J.K. Rowling',
        isCorrect: false,
      },
    ],
  },
  {
    d: 106,
    question: 'Quel est le personnage principal de "L´Étranger" d´Albert Camus?',
    categorie: 'Littérature',
    answers: [
      {
        text: 'Meursault',
        isCorrect: true,
      },
      {
        text: 'Raskolnikov',
        isCorrect: false,
      },
      {
        text: 'Jean Valjean',
        isCorrect: false,
      },
      {
        text: 'Holden Caulfield',
        isCorrect: false,
      },
    ],
  },
  {
    id: 107,
    question: 'Qui est le réalisateur du film "Inception"?',
    categorie: 'Art',
    answers: [
      {
        text: 'Christopher Nolan',
        isCorrect: true,
      },
      {
        text: 'Quentin Tarantino',
        isCorrect: false,
      },
      {
        text: 'Steven Spielberg',
        isCorrect: false,
      },
      {
        text: 'Martin Scorsese',
        isCorrect: false,
      },
    ],
  },
  {
    id: 108,
    question: 'Quel artiste a interprété la chanson "Like a Rolling Stone"?',
    categorie: 'Art',
    answers: [
      {
        text: 'Bob Marley',
        isCorrect: false,
      },
      {
        text: 'Bob Dylan',
        isCorrect: true,
      },
      {
        text: 'Elvis Presley',
        isCorrect: false,
      },
      {
        text: 'Michael Jackson',
        isCorrect: false,
      },
    ],
  },
  {
    id: 109,
    question: 'Quelle œuvre cinématographique a remporté l´Oscar du meilleur film en 1994?',
    categorie: 'Art',
    answers: [
      {
        text: 'Forrest Gump',
        isCorrect: true,
      },
      {
        text: 'Pulp Fiction',
        isCorrect: false,
      },
      {
        text: 'The Shawshank Redemption',
        isCorrect: false,
      },
      {
        text: 'Schindler´s List',
        isCorrect: false,
      },
    ],
  },
  {
    id: 110,
    question: 'Quel est le compositeur de la célèbre symphonie "La Neuvième"?',
    categorie: 'Art',
    answers: [
      {
        text: 'Wolfgang Amadeus Mozart',
        isCorrect: false,
      },
      {
        text: 'Ludwig van Beethoven',
        isCorrect: true,
      },
      {
        text: 'Johann Sebastian Bach',
        isCorrect: false,
      },
      {
        text: 'Pyotr Ilyich Tchaikovsky',
        isCorrect: false,
      },
    ],
  },
  {
    id: 111,
    question: 'Quel artiste a peint "La Nuit étoilée"?',
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
    id: 112,
    question: 'Quel est le réalisateur du film "Pulp Fiction"?',
    categorie: 'Art',
    answers: [
      {
        text: 'Martin Scorsese',
        isCorrect: false,
      },
      {
        text: 'Quentin Tarantino',
        isCorrect: true,
      },
      {
        text: 'Christopher Nolan',
        isCorrect: false,
      },
      {
        text: 'Steven Spielberg',
        isCorrect: false,
      },
    ],
  },
  {
    id: 113,
    question: 'Quel groupe musical a interprété la chanson "Bohemian Rhapsody"?',
    categorie: 'Art',
    answers: [
      {
        text: 'The Beatles',
        isCorrect: false,
      },
      {
        text: 'Queen',
        isCorrect: true,
      },
      {
        text: 'Led Zeppelin',
        isCorrect: false,
      },
      {
        text: 'The Rolling Stones',
        isCorrect: false,
      },
    ],
  },
  {
    id: 114,
    question: 'Quel réalisateur a dirigé le film "The Dark Knight"?',
    categorie: 'Art',
    answers: [
      {
        text: 'Christopher Nolan',
        isCorrect: true,
      },
      {
        text: 'Quentin Tarantino',
        isCorrect: false,
      },
      {
        text: 'Steven Spielberg',
        isCorrect: false,
      },
      {
        text: 'Martin Scorsese',
        isCorrect: false,
      },
    ],
  },
  {
    id: 115,
    question: 'Quel célèbre réalisateur a réalisé "Citizen Kane" en 1941?',
    categorie: 'Art',
    answers: [
      {
        text: 'Alfred Hitchcock',
        isCorrect: false,
      },
      {
        text: 'Orson Welles',
        isCorrect: true,
      },
      {
        text: 'Stanley Kubrick',
        isCorrect: false,
      },
      {
        text: 'Francis Ford Coppola',
        isCorrect: false,
      },
    ],
  },
  {
    id: 116,
    question: 'Quel artiste a créé la sculpture "Le Penseur"?',
    categorie: 'Art',
    answers: [
      {
        text: 'Leonardo da Vinci',
        isCorrect: false,
      },
      {
        text: 'Michel-Ange',
        isCorrect: false,
      },
      {
        text: 'Auguste Rodin',
        isCorrect: true,
      },
      {
        text: 'Pablo Picasso',
        isCorrect: false,
      },
    ],
  },
  {
    id: 117,
    question:
      'Quel réalisateur a remporté le prix du meilleur réalisateur aux Oscars pour "La La Land"?',
    categorie: 'Art',
    answers: [
      {
        text: 'Christopher Nolan',
        isCorrect: false,
      },
      {
        text: 'Quentin Tarantino',
        isCorrect: false,
      },
      {
        text: 'Damien Chazelle',
        isCorrect: true,
      },
      {
        text: 'Steven Spielberg',
        isCorrect: false,
      },
    ],
  },
  {
    id: 118,
    question: 'Quel est le constructeur automobile à avoir inventé l´automobile',
    categorie: 'Art',
    answers: [
      {
        text: 'Bugatti',
        isCorrect: false,
      },
      {
        text: 'Volkswagen',
        isCorrect: false,
      },
      {
        text: 'Mercedes-Benz',
        isCorrect: true,
      },
      {
        text: 'Ferrari',
        isCorrect: false,
      },
    ],
  },
  {
    id: 119,
    question: 'Quel compositeur a créé la célèbre symphonie "Symphonie fantastique"?',
    categorie: 'Art',
    answers: [
      {
        text: 'Wolfgang Amadeus Mozart',
        isCorrect: false,
      },
      {
        text: 'Ludwig van Beethoven',
        isCorrect: false,
      },
      {
        text: 'Johann Sebastian Bach',
        isCorrect: false,
      },
      {
        text: 'Hector Berlioz',
        isCorrect: true,
      },
    ],
  },
  {
    id: 120,
    question: 'Quel artiste a réalisé le célèbre tableau "La Nuit étoilée"?',
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
