<script setup>

import {useSearchMoviesStore} from "@/stores/searchMovies.js";
import {storeToRefs} from "pinia";
import {computed, onMounted, onUnmounted, ref, useTemplateRef, watch} from "vue";

const store = useSearchMoviesStore();
const {isLoading, searchResults} = storeToRefs(store)
const search = defineModel();

watch(search, async () => {
  showSearchResults.value = true;
  await store.fetchSearchMovies(search.value)
})

const searchItems = computed(() => {
    if (!search.value || !searchResults.value.length) return [];
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

onMounted(() => {
  document.addEventListener('click', manageSearchResultsVisibility)
})

onUnmounted(() => {
  document.removeEventListener('click', manageSearchResultsVisibility)
})

const showSearchResults = ref(false);
const searchWrapperRef = useTemplateRef('searchWrapperRef');

function manageSearchResultsVisibility(event) {
  if (searchWrapperRef.value && !searchWrapperRef.value.contains(event.target)) {
    showSearchResults.value = false
  }
}

</script>

<template>
  <div ref="searchWrapperRef" class="position-relative w-100">
    <v-text-field
      v-model="search"
      density="compact"
      placeholder="Search..."
      @focus="showSearchResults = true"
    ></v-text-field>
    <v-list
      v-if="searchItems.length && showSearchResults"
      :lines="false"
      class="position-absolute list-search"
      density="compact"
      nav
    >
      <v-list-item
        v-for="(item, i) in searchItems"
        :key="i"
        :to="item.route"
        :value="item"
        color="primary"
        @click="search = ''"
      >
        <v-list-item-title class="ml-2" >{{item.title}}</v-list-item-title>
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
