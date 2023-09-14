<template>
  <!-- FORM -->
  <form class="p-5" @submit.prevent="createBlog">
    <div class="mb-3">
      <label for="titleInput" class="form-label">Blog Title</label>
      <input v-model="dataBody.title" type="text" class="form-control" id="titleInput" required maxlength="50">
    </div>
    <div class="mb-3">
      <label for="bodyInput" class="form-label">What are you blogging about?</label>
      <input v-model="dataBody.body" type="text" class="form-control" id="bodyInput" required maxlength="1000">
    </div>
    <div class="mb-3">
      <label for="urlInput" class="form-label">Media URL</label>
      <input v-model="dataBody.imgUrl" type="url" class="form-control" id="urlInput">
    </div>
    <div class="mb-3">
      <label for="tagslInput" class="form-label">Tags</label>
      <input v-model="dataBody.tags" type="text" class="form-control" id="textInput" aria-describedby="tagInputHelp"
        maxlength="20">
      <div id="tagInputHelp" class="form-text">Make sure to space tags out with commas and spaces.</div>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  <!-- BLOG CARD -->
  <section v-for="blog in blogs" :key="blog.id"
    class="row container-fluid p-0 m-0 d-flex justify-content-center p-5 shadow">
    <!-- Profile View -->
    <div class="col-3 p-0 m-0 d-flex flex-column align-items-center">
      <!-- <img :src="blog.picture" alt="" class="profile-pic mt-4 shadow">
      <h3 class="mt-3">Author: {{ blog.name }}</h3> -->
      <router-link :to="{ name: 'Profile', params: { profileId: blog.creatorId } }" @click.stop>
        <img :src="blog.picture" class="profile-pic" :alt="blog.name">
        <p>{{ blog.name }}</p>

      </router-link>


      <span class="mt-3">Blog Post Tags:</span>
      <b class="text-center">{{ blog.tags.toString() }}</b>
    </div>
    <!-- ACTUAL BLOG -->
    <div class="col-9 p-0 m-0 d-flex flex-column">
      <h2>
        {{ blog.title }}
      </h2>
      <div>
        <img :src="blog.imgUrl" alt="img" class="img-fluid blog-media">
      </div>
      <div>
        {{ blog.body }}
      </div>

    </div>
  </section>
</template>

<script>
import { computed, onMounted } from 'vue'
import Pop from '../utils/Pop.js'
import { blogsService } from '../services/BlogsService.js'
import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import { ref } from 'vue'
import { Blog } from '../models/Blog.js'

export default {
  setup() {
    // DATA FROM FORM - SENT TO API - v-model="dataBody.whatever"
    let dataBody = ref({})

    // GET BLOGS
    async function getBlogs() {
      try {
        logger.log('[GETTING BLOGS 🔍]')
        await blogsService.getBlogs()
      } catch (error) {
        Pop.error(error)
      }
    }

    // MOUNT
    onMounted(() => { getBlogs() })

    // MAKE CODE ACCESIBLE TO WHOLE FILE
    return {
      blogs: computed(() => AppState.blogs.reverse()),
      account: computed(() => AppState.account),
      getBlogs,
      dataBody,

      // CREATE BLOGS
      async createBlog() {
        try {
          logger.log('[CREATING BLOG ✔️]')
          await blogsService.createBlog(dataBody.value)
          dataBody.value = {}
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.blog-media {
  max-height: 400px;
  background-size: cover;
}

.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}



.profile-pic {
  height: 100px;
  width: 100px;
  object-fit: cover;
  object-position: center;
  border-radius: 50em;
}
</style>
