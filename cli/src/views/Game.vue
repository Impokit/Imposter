<template>
    <div id="game">
        {{ gameCode }}
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const gameCode = ref(useRoute().params.gameCode || '');
</script>