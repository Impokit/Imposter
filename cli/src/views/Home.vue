<template>
    <div class="home flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-sky-900">
        <form @submit.prevent="handleJoinGame"
            class="login-form bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-sm border-2 border-sky-400 relative overflow-hidden">
            <div class="absolute inset-0 animate-pulse opacity-10 -z-10"
                style="background: linear-gradient(90deg, transparent 50%, rgba(34,211,238,0.2) 50%);"></div>

            <h1
                class="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">
                IMPOSTER GAME
            </h1>

            <label class="block mb-6">
                <span class="block text-sky-300 font-semibold mb-2 text-sm uppercase tracking-wide">Name:</span>
                <input v-model="playerName" type="text" required placeholder="Enter Name"
                    class="w-full px-4 py-3 bg-gray-700 text-sky-100 rounded-lg border border-sky-500/30 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent placeholder-gray-400 transition-all" />
            </label>

            <label class="block mb-6">
                <span class="block text-sky-300 font-semibold mb-2 text-sm uppercase tracking-wide">Gamecode:</span>
                <input v-model="gameCode" type="text" required placeholder="Enter code to join"
                    class="w-full px-4 py-3 bg-gray-700 text-sky-100 rounded-lg border border-sky-500/30 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent placeholder-gray-400 transition-all" />
            </label>

            <div class="buttons flex flex-col gap-4 mt-8">
                <button type="submit"
                    class="bg-sky-500/90 hover:bg-sky-400 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-all 
                           hover:scale-105 shadow-lg hover:shadow-sky-500/20 active:scale-95 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M3 22v-20l18 10-18 10z" />
                    </svg>
                    Join Game
                </button>

                <button type="button" @click="handleCreateGame"
                    class="bg-purple-500/90 hover:bg-purple-400 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-all 
                           hover:scale-105 shadow-lg hover:shadow-purple-500/20 active:scale-95 flex items-center justify-center gap-2">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 10h-4v-4h-2v4h-4v2h4v4h2v-4h4v-2z" />
                    </svg>
                    Create Game
                </button>
            </div>

            <div class="mt-6 text-center text-gray-400 text-xs">
                <p>Enter the spaceship as crewmate...</p>
                <p class="animate-pulse">or maybe 😈</p>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const playerName = ref('')
const gameCode = ref('')
const router = useRouter()

function handleJoinGame() {
    router.push({ path: `/game/${gameCode.value}` })
}

function handleCreateGame() {
    // Hier Logik für die Spielerstellung einfügen
    console.log('Creating new game with player:', playerName.value)
    // Beispiel: API-Aufruf und Weiterleitung
    // this.$router.push('/lobby')
}
</script>