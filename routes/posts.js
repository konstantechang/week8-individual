const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const successHandle = require('../utils/successHandle');
const postController = require('../controllers/post');
const { isAuthor } = require('../middleware/handleJWT');

//資料全撈
router.get('/', postController.getAll);
router.get('/:id', postController.getOne);
router.post('/', isAuthor, postController.postCreate);
router.post('/:id/like', isAuthor, postController.addLike);
router.delete('/:id/unlike', isAuthor, postController.deleteLike);
router.post('/:id/comment', isAuthor, postController.addComment);
router.get('/user/:id', postController.getUserPosts);







module.exports = router;