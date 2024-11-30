<script setup lang="ts">
const props = defineProps<{
  name: string;
  duration: number;
  similarity: number;
  audio: string;
}>();
</script>

<template>
  <div class="h-[133px] w-full border">Content</div>
</template>
