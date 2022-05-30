const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const successHandle = require('../utils/successHandle');
const postController = require('../controllers/post');
const { isAuthor } = require('../middleware/handleJWT');

//資料全撈
router.get('/', postController.getAll);
router.get('/:id', postController.getOne);
router.post('/create', isAuthor, postController.postCreate);
router.delete('/:id', isAuthor, postController.postDelete);
router.patch('/:id', isAuthor, postController.postPatch);
router.post('/:id/likes', isAuthor, postController.addLike);
router.delete('/:id/likes', isAuthor, postController.deleteLike);

module.exports = router;