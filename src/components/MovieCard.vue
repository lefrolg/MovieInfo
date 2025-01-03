<script setup>

import {computed} from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
  id: {
    type: Number,
    required: true,
  }
})

const imagePath = import.meta.env.VITE_TMDB_IMAGE_URL;

const date = computed(() => {
  const date = new Date(props.releaseDate);
  return date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
})

</script>
<template>
  <v-card
    :to="{name: 'movie', params: {id}}"
    class="mx-auto"
    color="blue-grey-lighten-5"
    elevation="6"
    height="100%"
    link
    rounded="large"
  >
    <v-img
      :src="imagePath + posterUrl"
      class="align-end text-white"
      cover
      height="400"
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
    <v-card-title class="pt-4">{{ title }}</v-card-title>
    <v-card-text>
      <div class="mb-1">{{ date }}</div>
      <div v-if="rating" class="d-flex align-center justify-space-between ga-2">
        <v-rating
          :length="10"
          :model-value="rating"
          active-color="orange"
          readonly
          size="small"
        />
        <div class="rating-number">
          {{ rating }}
        </div>
      </div>
    </v-card-text>
  </v-card>
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
