<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <v-app theme="light" class="w-100">
      <v-app-bar title="App bar"></v-app-bar>

      <v-main>
        <v-container class="container-app">
          <router-view />
        </v-container>
      </v-main>
    </v-app>
</template>

<style scoped>

.container-app {
  max-width: 1200px;
}
</style>
