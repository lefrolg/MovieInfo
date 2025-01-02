<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <v-app theme="light" class="w-100">
      <v-app-bar title="App bar"></v-app-bar>

      <v-main>
        <v-container>
          <router-view />

        </v-container>
      </v-main>
    </v-app>
</template>

<style scoped>
</style>
