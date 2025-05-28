<template>
  <div id="app" class="flex flex-col h-dvh">
    <router-view />
    <Nav />
  </div>
</template>

<script setup>
import Nav from './components/Nav.vue';
</script>
