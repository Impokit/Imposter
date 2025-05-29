<template>
    <div id="game" class="p-6 bg-gray-900 min-h-screen text-gray-100">
        <div class="text-lg font-semibold mb-4">
            Game Code: <span class="font-mono text-green-400">{{ gameCode }}</span>
        </div>
        <div v-if="players.length">
            <h3 class="text-base font-bold mb-2 text-gray-200">Players:</h3>
            <div class="flex flex-wrap gap-3">
                <TransitionGroup name="list" tag="div" class="flex flex-wrap gap-3 w-full">
                    <div v-for="player in players" :key="player.id"
                        class="bg-gray-800 rounded-lg px-4 py-2 shadow text-gray-100 flex items-center">
                        <span class="font-semibold">{{ player.name }}</span>
                    </div>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const gameCode = ref(useRoute().params.gameCode || '')
const playerName = ref(useRoute().query.playerName || 'Error');
const players = ref([])

let socket = null

onMounted(() => {
    socket = new WebSocket('ws://localhost:8080')
    socket.onopen = () => {
        socket.send(JSON.stringify({ type: 'joinGame', gameId: gameCode.value, playerName: playerName.value }))
    }
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log('Received:', data)

        if (data.type === 'playerJoined' || data.type === 'playerLeft') {
            players.value = data.players || []

        }
    }
    socket.onerror = (error) => {
        console.error('WebSocket error:', error)
    }
    socket.onclose = () => {
        console.log('WebSocket closed')
    }
})

onBeforeUnmount(() => {
    if (socket) {
        socket.send(JSON.stringify({ type: 'exitGame', gameId: gameCode.value, playerName: playerName.value }))
        socket.close()
    }
})
</script>