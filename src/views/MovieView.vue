<script setup>

import {computed, onMounted} from "vue";
import {useRoute} from "vue-router";
import {useMovieStore} from "@/stores/movieStore.js";
import {storeToRefs} from "pinia";

const route = useRoute();
const store  = useMovieStore();
const {movie, movieYear, genres} = storeToRefs(store);

const movieId = computed(() => route.params.id)
onMounted(async () => {
  await store.setMovieData(movieId.value);
})

const imagePath = import.meta.env.VITE_TMDB_IMAGE_URL_BIG;


</script>

<template>

  <v-sheet
    v-if="movie?.id == movieId"
    border="none"
    class="text-body-2 mx-auto"
    max-width="1400"
  >
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="4">
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

        <v-col cols="12" md="8">
          <h1 v-if="movie.id"> {{ movie.title }} ({{ movieYear }}) </h1>
          <p class="mb-2"><i>{{ movie.tagline }}</i></p>
          <div class="d-flex align-center ga-2 mb-4">
            <v-rating
              :length="10"
              :model-value="movie.vote_average"
              active-color="orange"
              hover
              readonly
              size="small"
            />
            <div class="rating-number">
              ({{ movie.vote_average }})
            </div>
          </div>
          <div v-if="genres" class="mb-2">
            Genres: {{ genres }}
          </div>
          <div>{{ movie.overview }}</div>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
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
