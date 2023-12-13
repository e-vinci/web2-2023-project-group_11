const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('node:path');
const { error } = require('node:console');
const { parse, serialize } = require('../utils/json');

const jwtSecret = 'ilovemypizza!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

const jsonDbPath = path.join(__dirname, '/../data/users.json');

const defaultUsers = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('admin', saltRounds),
    score: 0,
    nbPartie: 0,
  },
];

async function login(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (!userFound) return undefined;

  const passwordMatch = await bcrypt.compare(password, userFound.password);
  if (!passwordMatch) return undefined;

  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

async function register(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (userFound) return undefined;
  if (password.length < 8) {
    // eslint-disable-next-line no-undef
    sessionStorage.setItem(error, 'weak_password');
  }

  if (username.length < 1) {
    // eslint-disable-next-line no-undef
    sessionStorage.setItem(error, 'empty_username');
  }

  await createOneUser(username, password);

  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

function readOneUserFromUsername(username) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.username === username);
  if (indexOfUserFound < 0) return undefined;

  return users[indexOfUserFound];
}

async function createOneUser(username, password) {
  const users = parse(jsonDbPath, defaultUsers);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createdUser = {
    id: getNextId(),
    username,
    password: hashedPassword,
  };

  users.push(createdUser);

  serialize(jsonDbPath, users);

  return createdUser;
}

function getNextId() {
  const users = parse(jsonDbPath, defaultUsers);
  const lastItemIndex = users?.length !== 0 ? users.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = users[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}
function readAllUsers() {
  const allUsers = parse(jsonDbPath, defaultUsers);
  return allUsers;
}
async function changerScore(id, nouveauScore) {
  try {
    const idNumber = parseInt(id, 10);
    const users = parse(jsonDbPath, defaultUsers);
    const foundIndex = users.findIndex((user) => user.id === idNumber);

    if (foundIndex < 0) return undefined;

    users[foundIndex].score = nouveauScore;

    await serialize(jsonDbPath, users); // Attendez la fin de l'opération asynchrone

    return users[foundIndex];
  } catch (er) {
    console.error('Erreur lors de la mise à jour du score :', er);
    throw er;
  }
}

module.exports = {
  login,
  register,
  readOneUserFromUsername,
  readAllUsers,
  changerScore,
};
