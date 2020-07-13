const countBy = require('lodash/countBy')
const groupBy = require('lodash/groupBy')
const reduce = require('lodash/reduce')
const forEach = require('lodash/forEach')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const adder = (a, b) => {
        return a + b
    }
    const likes = blogs.map(blog => blog.likes)
    return likes.reduce(adder, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }

    blogs.sort((a, b) => {
        return a.likes < b.likes
    })

    return {
        title: blogs[0].title,
        author: blogs[0].author,
        likes: blogs[0].likes
    }
}

const mostBlogs = blogs => {
    if (blogs.length === 0) return undefined

    const counts = countBy(blogs, 'author')
    const comparator = (a, b) => {
        return counts[a] > counts[b] ? a : b
    }
    const author = reduce(Object.keys(counts), comparator)

    return {
        author,
        blogs: counts[author]
    }
}

const mostLikes = blogs => {
    if (blogs.length === 0) return undefined

    const grouped = groupBy(blogs, 'author')
    const likes = {}
    forEach(Object.keys(grouped), author => likes[author] = totalLikes(grouped[author]))
    const comparator = (a, b) => {
        return likes[a] > likes[b] ? a : b
    }
    const author = reduce(Object.keys(likes), comparator)

    return {
        author,
        likes: likes[author]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}