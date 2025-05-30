<template>
    <div>
        <section class="flex flex-col items-center">
            <!-- Increment Button -->
            <button @click.prevent="increment" aria-label="Increase value" class="control-button mb-2">
                <ChevronUp />
            </button>

            <!-- Display Input -->
            <input class="text-right bg-transparent w-10 h-10 border border-[#A9B8D9] rounded-md" readonly type="number"
                :value="selectedIndex" />

            <!-- Decrement Button -->
            <button @click.prevent="decrement" aria-label="Decrease value" class="control-button mt-2">
                <ChevronDown />
            </button>
        </section>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'


const props = defineProps({
    modelValue: {
        type: Number,
        required: true,
    },
    preventMinus: {
        type: Boolean,
        default: false,
    },
    maxValue: {
        type: Number,
        default: Infinity
    }
})

const emit = defineEmits(['update:modelValue'])

const selectedIndex = computed({
    get: () => props.modelValue,
    set: (val) => val >= 0 ? val <= props.maxValue ? emit('update:modelValue', val) : null : null
})

const increment = () => {
    selectedIndex.value += 1
};

const decrement = () => {
    selectedIndex.value -= 1
};
</script>
