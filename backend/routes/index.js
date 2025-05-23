// const express = require('express');
// const router = express.Router();

// const userRoutes = require('./users');

// router.use('/users', userRoutes);

// module.exports = router;


const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./users');     // if you have user-specific routes
const postRoutes = require('./postRoutes'); // for blog post CRUD

router.use('/auth', authRoutes);   // Auth routes under /auth (e.g., /auth/login)
router.use('/users', userRoutes);  // User-related routes under /users
router.use('/posts', postRoutes);  // Post CRUD routes under /posts

module.exports = router;
