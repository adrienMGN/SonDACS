const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');

router.post('/', async (req, res) => {
  const { question, options } = req.body;
  const votes = options.map(() => 0);
  const poll = new Poll({ question, options, votes });
  await poll.save();
  res.json({ id: poll._id });
});

router.get('/:id', async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  res.json(poll);
});

router.post('/:id/vote', async (req, res) => {
  const { optionIndex } = req.body;
  const poll = await Poll.findById(req.params.id);
  poll.votes[optionIndex]++;
  await poll.save();
  res.json({ success: true });
});

module.exports = router;