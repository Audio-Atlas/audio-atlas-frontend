<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: "Audio Atlas",
  meta: [
    {
      name: "description",
      content: "A fuzzy search tool for sound effects",
    },
  ],
});
</script>

<style>
html,
body,
#__nuxt {
  height: 100%;
}
</style>
