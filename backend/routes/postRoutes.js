
const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');
const { verifyToken } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllPosts);       // List all posts, with optional search
router.get('/:id', getPostById);    // View a single post by ID

// Protected routes (require authentication)
router.post('/', verifyToken, createPost);     // Create new post
router.put('/:id', verifyToken, updatePost);   // Update post by ID
router.delete('/:id', verifyToken, deletePost);// Delete post by ID

module.exports = router;
