<template>
  <div class="relative h-[76px] w-[710px] items-center">
    <Input
      id="search"
      v-model="editQuery"
      type="text"
      placeholder="Find the perfect sound effect..."
      class="size-full rounded-none border-muted-foreground bg-transparent pl-6 pr-20 text-xl"
      @keyup.enter="searchHandler"
    />
    <span
      class="absolute inset-y-0 end-0 flex items-center justify-center px-6"
    >
      <Icon
        name="mdi:magnify"
        class="size-10 cursor-pointer text-muted-foreground transition-all hover:bg-white"
        @click="searchHandler"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import { Input } from "@/components/ui/input";

const editQuery = ref("");

const searchHandler = async () => {
  if (!editQuery.value) return;
  const q = editQuery.value;
  setTimeout(() => {
    editQuery.value = "";
  }, 500); // Clear the input after the animation finishes
  await navigateTo(`/?q=${q}`);
};
</script>
