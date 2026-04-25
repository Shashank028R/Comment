import express from 'express';
import createUser from '../controllers/Users/createUser.js';
import loginUser from '../controllers/Users/loginUser.js';
import createComment from '../controllers/Comments/createComment.js';
import getAllComments from '../controllers/Comments/getAllComment.js';
import getComment from '../controllers/Comments/getComment.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Server is Running');
});

router.get('/getComments/:commentId', getComment);
router.get('/getComments', getAllComments);
router.post('/auth/register', createUser);
router.post('/auth/login', loginUser);
router.post('/comments', createComment);

export default router;