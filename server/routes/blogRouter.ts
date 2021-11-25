import express from 'express';
import blogCtrl from '../controllers/blogCtrl';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/blog/create', auth, blogCtrl.createBlog);

export default router;
