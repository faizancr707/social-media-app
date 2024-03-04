const express = require('express');
const socialController = require('../controllers/social');

const router = express.Router();

router.get('/', socialController.viewHomePage);
router.post('/post-picture', socialController.postPicture);
router.post('/post-comment/:PictureId', socialController.postComment);
router.delete('/delete-comment/:CommentId', socialController.deleteComment);
router.get('/get-pictures', socialController.getAllPictures);
router.get('/get-comments/:PictureId', socialController.getPictureComments);

module.exports = router;
