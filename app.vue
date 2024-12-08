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

body {
  background: rgb(32, 22, 46);
  background: linear-gradient(
    131deg,
    rgb(44, 29, 65) 0%,
    rgb(24, 25, 53) 37%,
    rgb(29, 31, 59) 63%,
    rgb(39, 60, 95) 100%
  );
  background-attachment: fixed;
}
</style>
