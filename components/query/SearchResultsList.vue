<script setup lang="ts">
import type { Result, APIResult } from "~/aa-util";
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
const page = ref(1);
const totalPages = ref(1);
const perPage = 10;

onMounted(() => {
  onChangeQuery(query.value);
});

const onChangeQuery = async (q: string) => {
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
    const res = await fetchSearchResults(perPage, q);
    if (res.length === 0) {
      message.value = `No results found for "${q}"`;
    } else {
      const apires: APIResult[] = res as APIResult[];
      results.value = apires.map((r) => {
        return {
          id: r.id,
          name: r.name,
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

const loadPage = async (page: number) => {
  console.log("Loading page", page);
};
</script>

<template>
  <div v-if="message !== ''" class="">
    <span>{{ message }}</span>
  </div>
  <div
    v-else
    class="flex size-full max-w-6xl flex-col items-center gap-2 overflow-y-hidden pt-3"
  >
    <div class="w-full">
      <span class="text-sm text-muted-foreground">
        Results for "{{ query }}"
      </span>
    </div>
    <div
      class="no-scrollbar flex w-full flex-col items-center gap-2 overflow-y-scroll pb-40"
    >
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
          v-if="page > 1"
          class="cursor-pointer text-sm"
          @click="loadPage(page - 1)"
        >
          &lt;
        </span>
        <span class="text-sm"> Page {{ page }} of {{ totalPages }} </span>
        <span
          v-if="page < totalPages"
          class="cursor-pointer text-sm"
          @click="loadPage(page + 1)"
        >
          &gt;
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
