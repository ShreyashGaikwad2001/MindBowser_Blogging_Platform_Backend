
const Post = require('../models/Post');
const User = require('../models/User');
const { Op } = require('sequelize');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const post = await Post.create({ title, content, userId });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all posts (with optional search by title/content)
exports.getAllPosts = async (req, res) => {
  try {
    const { search } = req.query;
    let posts;

    const whereClause = search
      ? {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { content: { [Op.like]: `%${search}%` } }
          ]
        }
      : {};

    posts = await Post.findAll({
      where: whereClause,
      include: [{ model: User, as: 'author', attributes: ['id', 'username'] }],
      order: [['createdAt', 'DESC']]
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'username'] }]
    });

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.userId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    const { title, content } = req.body;

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.userId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    await post.destroy();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
