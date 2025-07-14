import express from 'express';
import {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
} from '../controllers/articleController.js';
import { requireAuth } from '../middleware/auth.js';


const router = express.Router();

//public routes
router.get('/', getArticles);
router.get('/:id', getArticle);

//protected routes
router.post('/',requireAuth, createArticle);
router.put('/:id',requireAuth, updateArticle);
router.delete('/:id',requireAuth, deleteArticle);

export default router;
