const express = require('express');

const {
  readAllUsers,
  changerScore,
  readBestScore,
} = require('../models/users');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  const allUsers = readAllUsers();
  res.json(allUsers);
});

router.patch('/updateBestScore', async (req, res) => {
  console.log('entre updte score route');
  try {
    const nouveauScore = req?.body?.nouveauScore?.length !== 0 ? req.body.nouveauScore : undefined;
    const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
    console.log(username, nouveauScore);
    const updatedUser = await changerScore(username, nouveauScore);

    if (updatedUser) {
      return res.json(updatedUser);
    }
    return res.status(404).json({ error: 'Utilisateur non trouvé' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du score :', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.get('/getScore', (req, res) => {
  const username = req?.query?.categorie?.username !== 0 ? req.query.username : undefined;
  console.log('route', username);

  const score = readBestScore(username);
  console.log('route', score);
  return res.json(score);
});

module.exports = router;
