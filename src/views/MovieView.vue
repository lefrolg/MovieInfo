<script setup>

import {computed, onMounted, watch} from "vue";
import {useRoute} from "vue-router";
import {useMovieStore} from "@/stores/movieStore.js";
import {storeToRefs} from "pinia";
import MovieCard from "@/components/MovieCard.vue";

const route = useRoute();
const store = useMovieStore();
const {movie, similarMovies, movieYear, genres, countries, isLoading} = storeToRefs(store);

const movieId = computed(() => route.params.id)

watch(movieId, async () => {
  store.emptyMovie()
  return await setMovieData()
})

onMounted(async () => {
  return await setMovieData()
})

async function setMovieData() {
  return await Promise.all([
    store.setMovieData(movieId.value),
    store.setSimilarMovies(movieId.value)
  ])
}

const imagePath = import.meta.env.VITE_TMDB_IMAGE_URL_BIG;


</script>

<template>
  <v-sheet
      border="none"
      class="text-body-2 mx-auto"
      max-width="1200"
  >
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="3">
          <v-img
              :src="imagePath + movie?.poster_path"
              aspect-ratio="16/9"
              class="align-end text-white rounded-lg"
              cover
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                    color="grey-lighten-4"
                    indeterminate
                ></v-progress-circular>
              </div>
            </template>
          </v-img>
        </v-col>

        <v-col cols="12" md="9" v-if="!isLoading">
          <h1 v-if="movie.id"> {{ movie.title }}
            <template v-if="movieYear">
              ({{ movieYear }})
            </template>
          </h1>
          <p class="mb-2"><i>{{ movie.tagline }}</i></p>
          <div class="d-flex align-center ga-2 mb-4" v-if="movie.vote_average">
            <v-rating
                :length="10"
                :model-value="movie.vote_average"
                active-color="orange"
                hover
                readonly
                size="small"
            />
            <div class="rating-number">
              {{ movie.vote_average }} ({{ movie.vote_count }})
            </div>
          </div>
          <div v-if="genres" class="mb-2">
            <span class="pr-2 font-weight-bold">Genres:</span> {{ genres }}
          </div>
          <div v-if="countries" class="mb-4">
            <span class="pr-2 font-weight-bold">Countries:</span> {{ countries }}
          </div>
          <div v-if="movie.overview">{{ movie.overview }}</div>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
  <v-container>
    <h2 class="mb-2">Similar movies</h2>
    <v-row v-if="similarMovies.length">
      <v-col v-for="movie of similarMovies" :key="movie?.id" cols="3">
        <movie-card
            :id="movie?.id"
            :poster-url="movie?.poster_path || ''"
            :rating="movie?.vote_average || 0"
            :release-date="movie?.release_date || ''"
            :title="movie?.title || ''"
        />
      </v-col>
    </v-row>
  </v-container>

</template>

<style scoped>
:deep(.v-rating__item .v-btn--icon.v-btn--density-default) {
  width: auto;
  height: auto;
}

.rating-number {
  line-height: 1;
}
</style>
