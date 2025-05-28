<template>
  <div class="h-dvh">
    <link
      href="https://fonts.googleapis.com/css2?family=Creepster&display=swap"
      rel="stylesheet"
    />
    <main class="flex h-full flex-col items-center justify-center gap-20">
      <section>
        <h1
          style="font-family: 'Creepster', cursive"
          class="text-[100px] text-transparent text-center tracking-[10.8px] bg-clip-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
        >
          <span
            class="text-transparent bg-clip-text bg-gradient-to-tr from-red-900 via-red-600 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
            >I</span
          >
          <span
            class="text-transparent bg-clip-text bg-gradient-to-tl from-red-800 via-red-500 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
            >M</span
          >
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-red-900 via-red-700 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
            >P</span
          >
          <span
            class="text-transparent bg-clip-text bg-gradient-to-b from-red-800 via-red-500 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
            >O</span
          >
          <span
            class="text-transparent bg-clip-text bg-gradient-to-tr from-red-900 via-red-600 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
            >S</span
          >
          <span
            class="text-transparent bg-clip-text bg-gradient-to-tl from-red-700 via-red-500 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
            >T</span
          >
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-red-800 via-red-700 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
            >E</span
          >
          <span
            class="text-transparent bg-clip-text bg-gradient-to-b from-red-900 via-red-800 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
            >R</span
          >
        </h1>
        <p
          class="text-center text-[30px] text-[#C2DCFF] tracking-[2.4px] font-poppins"
        >
          Guess. Reveal. Win.
        </p>
      </section>
      <section>
        <div class="flex flex-row gap-4">
          <button
            @click="showJoinGamePopup = true"
            class="bg-gradient-to-r from-[#4266B8] to-[#4A7CFF] flex gap-2 px-4 py-2 rounded-full active:scale-95 shadow-md hover:shadow-lg transition"
          >
            <JoinPlus color="#ffffff" />
            <span class="font-semibold text-[16px] text-white font-poppins"
              >Join Game</span
            >
          </button>
          <button
            @click="handleCreateGame"
            class="bg-gradient-to-r from-[#222E47] to-[#233D75] flex items-center gap-2 px-4 py-2 rounded-full active:scale-95 shadow-md hover:shadow-lg transition"
          >
            <PersonPlus color="#ffffff" />
            <span class="font-semibold text-[16px] text-white font-poppins"
              >Host a Game</span
            >
          </button>
        </div>
      </section>
    </main>

    <footer class="text-[#4A5980] py-4 fixed bottom-10 w-full select-none">
      <div class="container mx-auto text-center">
        <p class="text-sm">© 2025 Impokit — Imposter</p>
      </div>
    </footer>

    <!-- Join Game Popup -->
    <popup :show="showJoinGamePopup" @update:show="showJoinGamePopup = false">
      <template #header>
        <div class="flex justify-center">
          <link
            href="https://fonts.googleapis.com/css2?family=Creepster&display=swap"
            rel="stylesheet"
          />
          <h3
            style="font-family: 'Creepster', cursive"
            class="text-4xl font-bold text-transparent text-center tracking-[10.8px] bg-clip-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
          >
            <span
              class="text-transparent bg-clip-text bg-gradient-to-tr from-red-900 via-red-600 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
              >J</span
            >
            <span
              class="text-transparent bg-clip-text bg-gradient-to-tl from-red-800 via-red-500 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
              >o</span
            >
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-red-900 via-red-700 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
              >i</span
            >
            <span
              class="text-transparent bg-clip-text bg-gradient-to-b from-red-800 via-red-500 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
              >n</span
            >
            <span class="px-2"></span>
            <span
              class="text-transparent bg-clip-text bg-gradient-to-tl from-red-700 via-red-500 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
              >g</span
            >
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-red-800 via-red-700 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
              >a</span
            >
            <span
              class="text-transparent bg-clip-text bg-gradient-to-b from-red-900 via-red-800 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
              >m</span
            >
            <span
              class="text-transparent bg-clip-text bg-gradient-to-b from-red-900 via-red-800 to-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
              >e</span
            >
          </h3>
        </div>
      </template>

      <template #body>
        <div class="flex flex-col gap-4 items-center mt-4">
          <input
            v-model="gameCode"
            type="text"
            placeholder="Enter Game Code"
            class="w-64 text-center border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A7CFF] font-poppins"
          />
          <input
            v-model="playerName"
            type="text"
            placeholder="Enter Your Name"
            class="w-64 text-center border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A7CFF] font-poppins"
          />
        </div>
      </template>

      <template #footer>
        <div class="flex justify-center mt-6">
          <button
            @click="handleJoinGame"
            class="bg-gradient-to-r from-[#4266B8] to-[#4A7CFF] px-6 py-2 rounded-full text-white font-semibold font-poppins shadow-md hover:shadow-lg transition"
          >
            Join
          </button>
        </div>
      </template>
    </popup>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PersonPlus from "../assets/PersonPlus.vue";
import JoinPlus from "../assets/JoinPlus.vue";
import popup from "../components/popup.vue";

const playerName = ref("");
const gameCode = ref("");
const router = useRouter();
const showJoinGamePopup = ref(false);

function handleJoinGame() {
  router.push({ path: `/game/${gameCode.value}` });
}

function handleCreateGame() {
  console.log("Creating new game with player:", playerName.value);
}
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(to bottom, #495057, #6a040f);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  /* Optional shadow if needed */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
}
</style>
