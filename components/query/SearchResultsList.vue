<script setup lang="ts">
import type { APIResult, Result } from "~/aa-util";
import { fetchHealthCheck, fetchSearchResults } from "~/aa-util";

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
const page = ref(0);
const totalPages = ref(1);
const perPage = 5;

onMounted(() => {
  onChangeQuery(query.value);
});

const fetchResults = async (q: string) => {
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
    const res = (await fetchSearchResults(q, perPage, page.value)) as APIResult;
    if (res.totalClips === 0) {
      message.value = `No results found for "${q}"`;
    } else {
      results.value = res.data.map((r) => {
        return {
          id: r.id,
          name: r.name,
          similarity: Math.round(r.similarity * 100),
        };
      });
      totalPages.value = res.totalPages;

      message.value = "";
    }
  } catch (e: any) {
    console.error("Failed to fetch search results:", e.message);
    message.value = "Failed to fetch search results";
  }
};

const onChangeQuery = async (q: string) => {
  message.value = "Loading...";
  query.value = q;
  page.value = 0;

  await fetchResults(q);
};

const onSetPlaying = (audioId: string | null) => {
  playing.value = audioId;
};

const loadPage = async (newPage: number) => {
  if (newPage < 0 || newPage >= totalPages.value) {
    return;
  }

  page.value = newPage;
  await fetchResults(query.value);
};
</script>

<template>
  <div v-if="message !== ''" class="">
    <span>{{ message }}</span>
  </div>
  <div
    v-else
    class="flex size-full max-w-6xl flex-col items-center justify-center gap-2 overflow-y-hidden py-6"
  >
    <div class="w-full">
      <span class="text-sm text-muted-foreground">
        Results for "{{ query }}"
      </span>
    </div>
    <div class="flex w-full flex-col items-center gap-4">
      <QuerySingleResult
        v-for="r in results"
        :key="r.id"
        :audio-id="r.id"
        :name="r.name"
        :similarity="r.similarity"
        :playing-clip="playing === r.id"
        :on-set-playing="onSetPlaying"
      />
      <div class="mt-4 flex items-center justify-center gap-2">
        <span
          v-if="page > 0"
          class="cursor-pointer text-sm"
          @click="loadPage(page - 1)"
        >
          &lt;
        </span>
        <span class="text-sm"> Page {{ page + 1 }} of {{ totalPages }} </span>
        <span
          v-if="page + 1 < totalPages"
          class="cursor-pointer text-sm"
          @click="loadPage(page + 1)"
        >
          &gt;
        </span>
      </div>
    </div>
  </div>
</template>
