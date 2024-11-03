<script setup lang="ts">
const count = ref(0);

const increment = () => {
  count.value++;
};
</script>

<template>
  <div class="flex items-center gap-2">
    <button
      class="rounded-md border border-gray-500 px-2 py-1"
      @click="increment"
    >
      Increment
    </button>
    <span>Count: {{ count }}</span>
  </div>
</template>
