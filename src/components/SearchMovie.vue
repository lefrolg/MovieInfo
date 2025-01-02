<script setup>

import {useSearchMoviesStore} from "@/stores/searchMovies.js";
import {storeToRefs} from "pinia";
import {computed, watch} from "vue";

const store = useSearchMoviesStore();
const {isLoading, searchResults} = storeToRefs(store)
const search = defineModel();

watch(search, () => {
  store.fetchSearchMovies(search.value)
})

const searchItems = computed(() => {
      if (!search.value) return [];
      const searchItems = searchResults.value.map(movie => {
        const year = movie?.release_date
            ? new Date(movie.release_date).getFullYear()
            : '';
        return {
          title: `${movie?.title} (${year})`,
          route: {name: 'movie', params: {id: movie?.id}}
        }
      })

      if (!searchItems.length && !isLoading.value) {
        return [{
          title: `No search results for ${search.value}`
        }]
      }
      return searchItems;
    }
)

</script>

<template>
  <div class="position-relative w-100">
    <v-text-field
        v-model="search"
        density="compact"
        placeholder="Search..."
    ></v-text-field>
    <v-list
        v-if="searchItems.length"
        :lines="false"
        class="position-absolute list-search"
        density="compact"
        nav
    >
      <v-list-item
          v-for="(item, i) in searchItems"
          :key="i"
          :border="1"
          :to="item.route"
          :value="item"
          border="black"
          color="primary"
          @click="search = ''"
      >
        <v-list-item-title class="ml-2" v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </div>

</template>

<style scoped>

:deep(.v-input__details) {
  display: none;
}

.list-search {
  z-index: 20;
  width: 100%;
  max-height: 80vh;
}

/* width */
.list-search::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.list-search::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.list-search::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.list-search::-webkit-scrollbar-thumb:hover {
  background: #555;
}

</style>
