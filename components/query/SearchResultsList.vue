<script setup lang="ts">
import type { Result, APIResult } from '~/aa-util';
import { fetchHealthCheck, fetchSearchResults, durationToMilliseconds } from '~/aa-util';

const route = useRoute();
const query = ref((route.query.q as string) || "");
watch(
  () => route.query.q,
  (search) => {
    onChangeQuery(search as string);
    query.value = search as string;
  },
);

const results = ref<Result[]>([]);
const message = ref("");
const playing = ref<string | null>(null);

onMounted(() => {
  onChangeQuery(query.value);
});

const onChangeQuery = async (q: string) => {
  console.log("Query changed:", q);

  if (q === query.value) {
    return;
  }

  message.value = "Loading...";
  query.value = q;
  try {
    const health = await fetchHealthCheck();
    if (!health) {
      console.error("API is down");
      message.value = "API is down";
      return;
    }
  } catch (e: any) {
    console.error("Failed to fetch health check:", e.message);
    message.value = "API is down";
    return;
  }

  try {
    const res = await fetchSearchResults(10, q);
    if (res.length === 0) {
      message.value = `No results found for "${q}"`;
    } else {
      const apires: APIResult[] = res as APIResult[];
      results.value = apires.map((r) => {
        return {
          id: r.id,
          name: r.name,
          duration: durationToMilliseconds(r.length),
          similarity: 0.0,
          audio: "",
        };
      });

      message.value = "";
    }
  } catch (e: any) {
    console.error("Failed to fetch search results:", e.message);
    message.value = "Failed to fetch search results";
  }
};

const onSetPlaying = (audioId: string | null) => {
  playing.value = audioId;
};

</script>

<template>
  <div v-if="message">
    <span>{{ message }}</span>
  </div>
  <div v-else class="flex size-full max-w-6xl flex-col items-center gap-2 pt-3">
    <div class="w-full">
      <span class="text-sm text-muted-foreground">
        Results for "{{ query }}"
      </span>
    </div>
    <div class="flex w-full flex-col gap-2">
      <QuerySingleResult
        v-for="r in results"
        :key="r.id"
        :audio-id="r.id"
        :name="r.name"
        :duration="r.duration"
        :similarity="r.similarity"
        :playing-clip="playing === r.id"
        :on-set-playing="onSetPlaying"
      />
    </div>
    <div class="mt-4 flex items-center gap-2">
      <span class="text-sm"> Page 1 / N </span>
      <span class="cursor-pointer text-sm"> > </span>
    </div>
  </div>
</template>
