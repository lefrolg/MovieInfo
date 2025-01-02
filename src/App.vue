<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <v-app theme="light" class="w-100">
      <v-app-bar>
         <router-link class="logo" :to="{name: 'home'}">
           Movie Info
         </router-link>
      </v-app-bar>

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

.logo {
  text-decoration: none;
  padding: 0 15px;
  font-size: 24px;
  color: #000;
}
</style>
