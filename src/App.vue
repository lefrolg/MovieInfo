<script setup>
import { RouterView } from 'vue-router'
import TheHeader from "@/components/TheHeader.vue";
</script>

<template>
    <v-app theme="light" class="w-100">
      <the-header/>

      <v-main class="pt-16">
        <v-container class="container-app">
          <router-view />
        </v-container>
      </v-main>
    </v-app>
</template>

<style scoped>
</style>
