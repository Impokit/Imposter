<template>
    <div v-if="phase === 'setup'" id="lobby" class="p-6 min-h-screen text-gray-100">
        <div v-if="players.length">
            <h3 class="text-base font-bold mb-2 text-gray-200">Players:</h3>
            <div class="flex flex-wrap gap-3">
                <TransitionGroup name="list" tag="div" class="flex flex-wrap justify-center items-center gap-3 w-full">
                    <div v-for="player in players" :key="player.id"
                        class="bg-gray-800 rounded-lg px-4 py-2 shadow text-gray-100 flex items-center">
                        <span class="font-semibold">{{ player.name }}</span>
                    </div>
                </TransitionGroup>
            </div>
        </div>

        <div v-if="isHost" class="mt-6 bg-gray-900 rounded-lg p-4 shadow">
            <label for="playerCount">PlayerCount</label>
            <NumberSelector name="playerCount" v-model="selectedIndex" preventMinus :maxValue="9" />
        </div>
    </div>
    <div id="selection">

    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import NumberSelector from '../components/NumberSelector.vue';

const gameCode = ref(useRoute().params.gameCode || '')
const playerName = ref(useRoute().query.playerName || 'Error');
const players = ref([])
const selectedIndex = ref(0)
const phase = ref('setup')
const isHost = ref(null)

let socket = null

onMounted(() => {
    socket = new WebSocket('ws://localhost:8080')
    socket.onopen = () => {
        socket.send(JSON.stringify({ type: 'joinGame', gameId: gameCode.value, playerName: playerName.value }))
    }
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log('Received:', data)

        if (data.isHost) {
            sessionStorage.setItem('h', true);
            isHost.value = true
        }

        switch (data.msg.type) {
            case 'playerJoined' || 'playerLeft': {
                players.value = data.msg.players || []
                break;
            }
            case 'changePhase': {
                phase.value = data.msg.phase
            }
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
        socket.close()
    }
})
</script>