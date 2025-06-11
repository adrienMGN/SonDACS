const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');

// Middleware pour gérer les sessions
router.use(require('express-session')({
  secret: 'sondacs-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 heures
}));

router.post('/', async (req, res) => {
  const { question, options, multipleChoice } = req.body;
  const votes = options.map(() => 0);
  const poll = new Poll({ 
    question, 
    options, 
    votes, 
    multipleChoice: multipleChoice || false,
    voterSessions: []
  });
  await poll.save();
  res.json({ id: poll._id });
});

router.get('/:id', async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  const sessionId = req.sessionID;
  const hasVoted = poll.voterSessions.includes(sessionId);
  
  res.json({
    ...poll.toObject(),
    hasVoted
  });
});

router.post('/:id/vote', async (req, res) => {
  try {
    const { optionIndex } = req.body; // Peut être un nombre ou un tableau
    const sessionId = req.sessionID;
    const poll = await Poll.findById(req.params.id);
    
    if (!poll) {
      return res.status(404).json({ error: 'Sondage non trouvé' });
    }
    
    // Vérifier si cette session a déjà voté
    if (poll.voterSessions.includes(sessionId)) {
      return res.status(400).json({ error: 'Vous avez déjà voté pour ce sondage' });
    }
    
    // Traiter le vote selon le type (simple ou multiple)
    if (poll.multipleChoice) {
      // Choix multiple : optionIndex doit être un tableau
      if (!Array.isArray(optionIndex)) {
        return res.status(400).json({ error: 'Pour un sondage à choix multiple, veuillez envoyer un tableau d\'indices' });
      }
      
      // Incrémenter chaque option sélectionnée
      optionIndex.forEach(index => {
        if (index >= 0 && index < poll.options.length) {
          poll.votes[index]++;
        }
      });
    } else {
      // Choix unique : optionIndex doit être un nombre
      if (typeof optionIndex !== 'number' || optionIndex < 0 || optionIndex >= poll.options.length) {
        return res.status(400).json({ error: 'Index d\'option invalide' });
      }
      
      poll.votes[optionIndex]++;
    }
    
    // Marquer cette session comme ayant voté
    poll.voterSessions.push(sessionId);
    
    await poll.save();
    res.json({ success: true });
    
  } catch (error) {
    console.error('Erreur lors du vote:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;