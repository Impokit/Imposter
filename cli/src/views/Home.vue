<template>
    <div class="h-dvh">
        <main class="flex h-full flex-col items-center justify-center gap-20">
            <section>
                <h1 class="text-center text-[72px] font-extrabold text-[#B2C2DB] tracking-[10.8px] font-poppins">
                    IMPOSTER
                </h1>
                <p class="text-center text-[30px] text-[#C2DCFF] tracking-[2.4px] font-poppins">Guess. Reveal. Win.</p>
            </section>
            <section>
                <div class="flex flex-row items-center justify-center gap-4">
                    <button @click="handleJoinGame"
                        class="bg-gradient-to-r from-[#4266B8] to-[#4A7CFF] flex items-center gap-2 px-3 py-2 rounded-full  active:scale-95">
                        <JoinPlus color="#ffffff" />
                        <span class="font-semibold text-[16px] text-white font-poppins">Join Game</span>
                    </button>
                    <button @click="handleCreateGame"
                        class="bg-gradient-to-r from-[#222E47] to-[#233D75] flex items-center gap-2 px-3 py-2 rounded-full active:scale-95">
                        <PersonPlus color="#ffffff" />
                        <span class="font-semibold text-[16px] text-white font-poppins">Host a Game</span>
                    </button>
                </div>
            </section>
        </main>
        <footer class="text-[#4A5980] py-4 fixed bottom-10 w-full">
            <div class="container mx-auto text-center">
                <p class="text-sm">© 2023 Imposter Game. All rights reserved.</p>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PersonPlus from '../assets/PersonPlus.vue'
import JoinPlus from '../assets/JoinPlus.vue'

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