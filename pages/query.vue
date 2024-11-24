<template>
  <div>
    /query?search={{ query }}
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'query',
  middleware: 'search-param',
})

const route = useRoute();
const query = ref(route.query.search as string || "");

watch(() => route.query.search, (search) => {
  query.value = search as string;
});

</script>