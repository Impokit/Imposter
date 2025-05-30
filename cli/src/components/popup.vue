<template>
    <div v-if="show" class="fixed inset-0 bg-[#03071e] bg-opacity-50 flex items-center justify-center"
        style="z-index: 1000;" @click.self="onMaskClick">
        <transition name="fade">
            <div class="bg-[#03071e] text-white rounded-lg shadow-lg w-full border border-gray-800 max-w-md">
                <div class="p-4 flex justify-center gap- items-center">
                    <slot name="header" />
                </div>

                <div class="p-4">
                    <slot name="body" />
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
const props = defineProps({
    show: Boolean,
    closable: {
        type: Boolean,
        default: false,
    },
    maskClosable: {
        type: Boolean,
        default: true,
    }
});
const emit = defineEmits(['update:show']);

function close() {
    emit('update:show', false);
}

function onMaskClick() {
    if (props.maskClosable) {
        close();
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
