const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)

    return likes.reduce((sum,item) => sum + item, 0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes)

    const favorite = blogs.find(blog => blog.likes === Math.max(...likes))

    return{
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    let authorArray = []
    let blogsArray = []
    blogs.forEach(blog => {
        if(authorArray.includes(blog.author)) {
            const index = authorArray.findIndex(author => author === blog.author)
            blogsArray[index] += 1
        } else {
            authorArray = authorArray.concat([blog.author])
            blogsArray = blogsArray.concat([1])
        }
    })
    const max = Math.max(...blogsArray)
    const maxIndex = blogsArray.findIndex(blogs => blogs === max)
    
    return {
        author: authorArray[maxIndex],
        numOfBlogs: blogsArray[maxIndex]
    }
}

const mostLikes = (blogs) =>{
    let authorArray = []
    let likesArray = []
    blogs.forEach(blog => {
        if(authorArray.includes(blog.author)) {
            const index = authorArray.findIndex(author => author === blog.author)
            likesArray[index] += blog.likes
        } else {
            authorArray = authorArray.concat([blog.author])
            likesArray = likesArray.concat([blog.likes])
        }
    })
    const max = Math.max(...likesArray)
    const maxIndex = likesArray.findIndex(blogs => blogs === max)
    
    return {
        author: authorArray[maxIndex],
        numOfLikes: likesArray[maxIndex]
    }
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}