<template>
  <div id="app" class="flex flex-col h-dvh bg-[#001427]">
    <router-view />
    <Nav />
  </div>
</template>

<script setup>
import Nav from './components/Nav.vue';
</script>
