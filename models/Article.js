import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: String,
  slug: String,
  content: String,
  tags: [String],
}, { timestamps: true });

export default mongoose.model('Article', articleSchema);
