<script setup>
import Headers from './Header.vue'
import Footer from './Footer.vue'
</script>

<template>
  <div>
    <Headers />
    <router-view />
    <Footer />
  </div>
</template>
