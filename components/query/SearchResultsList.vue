<script setup lang="ts">
const props = defineProps<{
  query: string;
}>();

interface Result {
  id: number;
  name: string;
  duration: number;
  similarity: number;
  audio: string;
}

const results = ref<Result[]>([]);
const pending = ref(true);

onMounted(async () => {
  console.log("SearchResultsList mounted with query:", props.query);
  // const res = await fetch(`/api/search?q=${props.query}`);
  // results.value = await res.json();

  // Mock data
  results.value = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    name: `Result ${i}`,
    duration: Math.random() * 100,
    similarity: Math.random(),
    audio: "https://www.soundjay.com/button/beep-07.wav",
  }));

  setTimeout(() => {
    pending.value = false;
  }, 1000);
});
</script>

<template>
  <div v-if="pending">
    <span>Loading...</span>
  </div>
  <div v-else class="flex size-full max-w-6xl flex-col items-center gap-2 pt-3">
    <div class="w-full">
      <span class="text-sm text-muted-foreground">
        Results for "{{ props.query }}"
      </span>
    </div>
    <div class="flex w-full flex-col gap-2">
      <QuerySingleResult
        v-for="r in results"
        :key="r.id"
        :name="r.name"
        :duration="r.duration"
        :similarity="r.similarity"
        :audio="r.audio"
      />
    </div>
    <div class="mt-4 flex items-center gap-2">
      <span class="text-sm"> Page 1 / N </span>
      <span class="cursor-pointer text-sm"> > </span>
    </div>
  </div>
</template>
