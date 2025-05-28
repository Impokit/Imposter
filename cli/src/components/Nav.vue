<template>
    <nav class="fixed bottom-0 left-0 w-full z-50">
        <div class="flex items-center justify-between px-4 py-2 bg-white shadow-md">
            <div class="flex items-center gap-2">
                <Logo />
                <h1 class="font-poppins text-[24px] font-extrabold tracking-[2.4px] text-[#233D75]">Imposter</h1>
            </div>
            <ul class="flex items-center gap-6 text-[#233D75] font-poppins text-[16px]">
                <router-link to="/">Home</router-link>
                <router-link>How to Play</router-link>
                <router-link>Join Game</router-link>
                <router-link>Host Game</router-link>
                <router-link>FAQ</router-link>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import Logo from '../assets/Logo.vue'
</script>