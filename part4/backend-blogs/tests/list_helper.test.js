const { test, describe } = require('node:test')
const assert = require('node:assert')
const list_helper = require('../utils/list_helper')

test('dummy returns 1', () => {
    const blogs = []
    const result = list_helper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test('when list is empty, likes are 0', () => {
        const blogs = []
        const result = list_helper.totalLikes(blogs)
        assert.strictEqual(result, 0)
    })
    test('when list has only 1 blog the likes are equal to that blog', () => {
        const blogs = [
            {
                title: "Hello, World!",
                author: "Kamran Rafi",
                url: null,
                likes: 9,
            }
        ]
        const result = list_helper.totalLikes(blogs)
        assert.strictEqual(result, blogs[0].likes)
    })
    test('bigger list is calculated right', () => {
        const blogs = [
            {
                title: "Hello, World!",
                author: "Kamran Rafi",
                url: null,
                likes: 9,
            },
            {
                title: "Hello, World!",
                author: "Hamza Malik",
                url: null,
                likes: 67,
            },
            {
                title: "Hello, World!",
                author: "Kamran Rafi",
                url: null,
                likes: 5,
            }
        ]
        const result = list_helper.totalLikes(blogs)
        assert.strictEqual(result, blogs[0].likes + blogs[1].likes + blogs[2].likes)
    })
})

describe('returns the most liked blog from blogs', () => {
    test('when the list is empty', () => {
        const result = list_helper.favoriteBlog([])
        assert.deepStrictEqual(result, null)
    })
    test('when the there is one blog return that blog', () => {
        const blogs = [
            {
                title: "Hello, World!",
                author: "Kamran Rafi",
                url: null,
                likes: 9,
            }
        ]
        const result = list_helper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, blogs[0])
    })
    test('when there are many blogs', () => {
        const blogs = [
            {
                title: "Hello, World!",
                author: "Kamran Rafi",
                url: null,
                likes: 9,
            },
            {
                title: "Hello, World!",
                author: "Hamza Malik",
                url: null,
                likes: 67,
            },
            {
                title: "Hello, World!",
                author: "Kamran Rafi",
                url: null,
                likes: 5,
            },
            {
                title: "Hello, World!",
                author: "Kamran Rafi",
                url: null,
                likes: 69,
            }
        ]
        const result = list_helper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, blogs[3])
    })
})

describe('return a object telling with author has most blogs', () => {
    test('when list is empty returns null', () => {
        const result = list_helper.mostBlogs([])
        assert.strictEqual(result, null)
    })
    test('when the is only one blog', () => {
        const blogs = [
            {
                title: "Hello, World!",
                author: "Kamran Rafi",
                url: null,
                likes: 9,
            }
        ]
        const result = list_helper.mostBlogs(blogs)
        assert.deepStrictEqual(
            result, 
            { author: "Kamran Rafi", blogs: 1 }
        )
    })
    test('when there are many blogs', () => {
        const blogs = [
            {
                title: "Hello, World!",
                author: "Kamran Rafi",
                url: null,
                likes: 9,
            },
            {
                title: "Hello, World!",
                author: "Hamza Malik",
                url: null,
                likes: 67,
            },
            {
                title: "Hello, World!",
                author: "Kamran Rafi",
                url: null,
                likes: 5,
            },
            {
                title: "Hello, World!",
                author: "Kamran Rafi",
                url: null,
                likes: 69,
            }
        ]
        const result = list_helper.mostBlogs(blogs)
        assert.deepStrictEqual(
            result, 
            { author: "Kamran Rafi", blogs:3 }
        )
    })
})