<script setup>

import {onMounted, onUnmounted, useTemplateRef} from "vue";
import MovieCard from "@/components/MovieCard.vue";
import {usePopularMoviesStore} from "@/stores/moviesStore.js";
import {storeToRefs} from "pinia";

const store = usePopularMoviesStore();
const {totalResults, isLoading, popularMovies} = storeToRefs(store)

const loadMoreTrigger = useTemplateRef('load-more-trigger');
const options = {
  root: null,
  threshold: '0',
};
const observer = new IntersectionObserver(observerCallback, options);

onMounted(() => {
   observer.observe(loadMoreTrigger.value);
})

onUnmounted(()=> {
  if (observer) observer.disconnect()
})

function observerCallback(entries) {
  if (!entries[0].isIntersecting) return;

  if (totalResults.value && popularMovies.value.length >= totalResults.value) {
    return;
  }

  if (isLoading.value) return;
  store.fetchPopularMoviesList()
}

</script>

<template>
  <h1 class="mb-3">Popular Movies</h1>
  <v-row v-if="popularMovies.length">
    <v-col v-for="movie of popularMovies" :key="movie?.id" cols="3">
      <movie-card
          :id="movie?.id"
          :poster-url="movie?.poster_path || ''"
          :rating="movie?.vote_average || 0"
          :release-date="movie?.release_date || ''"
          :title="movie?.title || ''"
      />
    </v-col>
  </v-row>
  <div ref="load-more-trigger"></div>
  <div v-if="isLoading" class="text-center">
    <v-icon class="loading" color="orange" icon="mdi-loading" size="x-large"></v-icon>
  </div>
</template>

<style scoped>
.loading {
  animation: rotateSpinner 1s infinite linear;
}

@keyframes rotateSpinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
