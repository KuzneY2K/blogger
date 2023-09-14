<template>
  <div class="about">
    <h2>{{ profile }}</h2>
  </div>
</template>

<script>
import { profilesService } from '../services/ProfileService.js'
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';

export default {
  setup() {

    onMounted(() => {
      getProfileById()
    });

    const route = useRoute();
    async function getProfileById() {
      try {
        await profilesService.getProfileById(route.params.profileId)
      } catch (error) {
        Pop.error(error)
      }
    }


    return {
      profile: computed(() => AppState.activeProfile)
    }
  }
}
</script>
