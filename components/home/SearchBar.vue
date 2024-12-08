<template>
  <div class="h-[76px] w-[710px] items-center">
    <Input
      id="search"
      v-model="editQuery"
      type="text"
      :placeholder="placeholders[placeholder]"
      class="size-full rounded-none border-muted-foreground bg-transparent pl-6 pr-20 text-xl"
      @keyup.enter="searchHandler"
    />
    <span class="absolute right-6 top-[100px]">
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
const placeholder = ref(0);
const placeholders = [
  "pshpshpshpshpsh",
  "powww",
  "pew pew",
  "krreeee",
  "tatata",
  "brrrr",
  "chkchk",
];
const placeholderCycleInterval = 2500;

const cyclePlaceholders = () => {
  setInterval(() => {
    placeholder.value = (placeholder.value + 1) % placeholders.length;
  }, placeholderCycleInterval);
};

onMounted(() => {
  cyclePlaceholders();
});

const searchHandler = async () => {
  if (!editQuery.value) return;
  const q = editQuery.value;
  setTimeout(() => {
    editQuery.value = "";
  }, 500); // Clear the input after the animation finishes
  await navigateTo(`/?q=${q}`);
};
</script>
