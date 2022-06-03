const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
// const thirdPartyController = require('../controllers/thirdParty');
const { isAuthor } = require('../middleware/handleJWT');

router.post('/user/sign_up', userController.userCreate);
router.post('/users/sign_in', userController.userLogin);
router.patch('/users/updatePassword', isAuthor, userController.updatePassword); //patch
router.get('/users/profile', isAuthor, userController.getProfile);
router.patch('/users/profile', isAuthor, userController.updateProfile);




router.post('/users/:id/follow', isAuthor, userController.addFollower);
router.delete('/users/:id/unfollow', isAuthor, userController.deleteFollower);
router.get('/users/getLikeList', isAuthor, userController.getLikesList);
router.get('/users/following', isAuthor, userController.getFollowList);

module.exports = router;