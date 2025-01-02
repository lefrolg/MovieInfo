<script setup>

import {RouterLink} from "vue-router";
import SearchMovie from "@/components/SearchMovie.vue";
</script>

<template>
  <v-app-bar height="auto">
    <v-container class="container-app py-2">
      <div class="d-flex flex-row flex-nowrap">
        <router-link class="logo" :to="{name: 'home'}">
          Movie Info

        </router-link>
        <search-movie/>
      </div>
    </v-container>

  </v-app-bar>
</template>

<style scoped>
:deep(.v-toolbar__content){
  overflow: visible;
}

.logo {
  text-decoration: none;
  width: 250px;
  padding: 0 15px;
  font-size: 24px;
  color: #000;
}
</style>
