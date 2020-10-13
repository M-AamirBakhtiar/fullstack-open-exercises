const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const initialVal = 0;
  const sum = blogs.reduce(
    (preVal, currentVal) => preVal + currentVal.likes,
    initialVal
  );

  return sum;
};

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((item) => item.likes));
  const favBlog = blogs.find(({ likes }) => likes === maxLikes);
  const { title, author, likes } = favBlog;
  return {
    title,
    author,
    likes,
  };
};

const mostBlogs = (array) => {
  const freqCounter = {};
  for (const val of array) {
    let author = val.author;
    freqCounter[author] = (freqCounter[author] || 0) + 1;
  }
  const numOfBlogs = Object.values(freqCounter);
  const maxBlog = Math.max(...numOfBlogs);
  let authorOfMaxBlog;
  for (key in freqCounter) {
    if (freqCounter[key] === maxBlog) {
      authorOfMaxBlog = key;
    }
  }
  return {
    author: authorOfMaxBlog,
    blogs: maxBlog,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
