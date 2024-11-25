<template>
  <div class="relative h-[40px] w-[464px] items-center">
    <Input
      id="search"
      v-model="query"
      type="text"
      placeholder="Find the perfect sound effect..."
      class="size-full rounded-none border-muted-foreground bg-transparent pl-4 pr-14 text-base"
      @keyup.enter="searchHandler"
    />
    <span
      class="absolute inset-y-0 end-0 flex items-center justify-center px-6"
    >
      <Icon
        name="mdi:magnify"
        class="size-6 cursor-pointer text-muted-foreground transition-all hover:bg-white"
        @click="searchHandler"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import { Input } from "@/components/ui/input";
const route = useRoute();
const query = ref((route.query.q as string) || "");

watch(
  () => route.query.q,
  (search) => {
    query.value = search as string;
  },
);

const searchHandler = async () => {
  if (!query.value) return;
  await navigateTo(`/?q=${query.value}`);
};
</script>
