import express from 'express';
import createUser from '../controllers/Users/createUser.js';
import loginUser from '../controllers/Users/loginUser.js';
import createComment from '../controllers/Comments/createComment.js';
import getAllComments from '../controllers/Comments/getAllComment.js';
import getComment from '../controllers/Comments/getComment.js';
import updateComment from '../controllers/Comments/updateComment.js';
import updateLike from '../controllers/Comments/updateLike.js';
import deleteComment from '../controllers/Comments/deleteComment.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import getReplies from '../controllers/Comments/getReplies.js';
import getProfile from '../controllers/Profile/getProfile.js';
import updateProfile from '../controllers/Profile/updateProfile.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Server is Running');
});

router.get('/getComments/:commentId', getComment);
router.get('/getComments', getAllComments);
router.post('/auth/register', createUser);
router.post('/auth/login', loginUser);
router.post('/comments', authMiddleware, createComment);
router.patch('/updateComment', authMiddleware, updateComment);
router.patch('/updateLike', authMiddleware, updateLike);
router.delete('/deleteComment', authMiddleware, deleteComment);
router.get('/comments/:commentId/replies', getReplies);
router.get("/profile", authMiddleware, getProfile);
router.patch("/profile", authMiddleware, updateProfile);

export default router;