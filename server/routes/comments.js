const router = require('express').Router();

const Comments = require('../db/models/comments');

router.post('/', async (req, res) => {
  try {
    const { comment: commentBody } = req.body;

    const comment = new Comments({ commentBody });

    const newComment = await comment.save();

    res.json(newComment);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const comments = await Comments.find({});

    res.json(comments);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const comment = await Comments.findById(req.params.id);

    res.json(comment || 'Comment not found');
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const comment = await Comments.findByIdAndUpdate(req.params.id);

    res.json(comment || 'Comment not found');
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedComment = await Comments.findByIdAndDelete(req.params.id);

    res.json(deletedComment ? `Deleted ${deletedComment.comment}` : 'Comment not found');
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
