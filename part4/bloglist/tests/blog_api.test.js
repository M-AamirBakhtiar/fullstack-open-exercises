const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

const { initialBlogs, blogsInDb, usersInDb } = helper;

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map((blog) => new Blog(blog));

  const promisedArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promisedArray);
});

describe('where there is initially some blogs saved', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all Blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test('Each blog has a unique identifier called id', async () => {
    const blogsAtStart = await blogsInDb();

    expect(blogsAtStart[0].id).toBeDefined();
    expect(blogsAtStart[1].id).toBeDefined();
  });
});

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url:
        'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

    const contents = blogsAtEnd.map((blog) => blog.title);

    expect(contents).toContain('First class tests');
  });

  test('succeeds when there is no likes present in data with zero as default value for likes', async () => {
    const blogWithNoLikes = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url:
        'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    };

    await api
      .post('/api/blogs')
      .send(blogWithNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd[2].likes).toBe(0);
  });

  test('fails with a status code 400 if data is invalid', async () => {
    const newBlog = {
      author: 'Some Author',
      likes: 10,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with a status code 204 with a valid id', async () => {
    const blogsAtStart = await blogsInDb();

    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);

    const titles = blogsAtEnd.map((b) => b.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('updating of an existing blog', () => {
  test('succeeds with status code 200 with valid data and id', async () => {
    const blogsAtStart = await blogsInDb();

    const blogToUpdate = blogsAtStart[0];

    blogToUpdate.likes = 10;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd).toHaveLength(initialBlogs.length);

    expect(blogsAtEnd[0].likes).toBe(10);
  });
});

describe('when there is initially one user in the database', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);

    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb();

    const freshUser = {
      username: 'sirpeanutx',
      name: 'aamir',
      password: 'aamir123',
    };

    await api
      .post('/api/users')
      .send(freshUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);

    expect(usernames).toContain(freshUser.username);
  });

  test('creation fails with proper status code and message with invalid user data', async () => {
    const usersAtStart = await usersInDb();

    const freshUser = {
      name: 'aamir',
      password: 'aamir123',
    };

    const result = await api
      .post('/api/users')
      .send(freshUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(
      'username: a user must have a username'
    );
    const usersAtEnd = await usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
