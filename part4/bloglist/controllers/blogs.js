const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();

const Blog = require('../models/blog');
const User = require('../models/user');

// const getTokenFrom = (request) => {
//   const authorization = request.get('authorization');

//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7);
//   }

//   return null;
// };

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  res.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', async (req, res) => {
  const body = req.body;

  const token = req.token;

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);

  await user.save();

  res.json(savedBlog);
});

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body;

  const blog = {
    title: body.title,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
    runValidators: true,
  });

  res.json(updatedBlog.toJSON());
});

blogsRouter.delete('/:id', async (req, res) => {
  const token = req.token;

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'invalid or missing token' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = await Blog.findById(req.params.id);

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } else {
    return res.status(401).json({ error: 'unauthorized request' });
  }
});

module.exports = blogsRouter;
