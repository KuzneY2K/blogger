import { AppState } from "../AppState.js";
import { Blog } from "../models/Blog.js";
import { api } from "./AxiosService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

class BlogsService {

    // GET BLOGS FUNC
    async getBlogs() {
        try {
            let res = await api.get('api/blogs')
            logger.log(res)
            AppState.blogs = res.data.map(blog => new Blog(blog))
            logger.log('[GOT ALL BLOGS ✔️]')
        } catch (error) {
            logger.log('[ERROR]', error)
            Pop.error('[SERVICE ERROR]')
        }
    }

    // CREATING BLOGS
    async createBlog(dataBody) {
        try {
            let res = await api.post('api/blogs', dataBody)
            let newBlog = new Blog(res.data)
            AppState.blogs.push(newBlog)
        } catch (error) {
            logger.log('[ERROR]', error)
            Pop.error('[SERVICE ERROR]')
        }
    }


    setActiveBlog(blogId) {
        const blog = AppState.blogs.find(blog => blog.id == blogId)
        AppState.activeblog = blog
    }

}

export const blogsService = new BlogsService()