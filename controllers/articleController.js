import Article from '../models/Article.js';

export const getArticles = async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 });
  res.json(articles);
};

export const getArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.json(article);
};

export const createArticle = async (req, res) => {
  const article = new Article(req.body);
  await article.save();
  res.status(201).json(article);
};

export const updateArticle = async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(article);
};

export const deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
