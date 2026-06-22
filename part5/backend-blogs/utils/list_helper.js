const _ = require('lodash')
require('./config')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog)=> blog.likes + acc, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 1) return blogs[0]
    let mostLikedBlog = null

    // [2, 4, 5, 3]

    for(let i = 0; i < blogs.length - 1; i++){
        if(blogs[i].likes > blogs[i+1].likes){
            mostLikedBlog = blogs[i]
        }
        else{
            mostLikedBlog = blogs[i+1]
        }
    }

    return mostLikedBlog
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0) return null
  const grouped = _.groupBy(blogs, 'author')

  const authors = _.map(grouped, (blogs, author) => ({
    author,
    blogs: blogs.length
  }))

  return _.maxBy(authors, 'blogs')
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}