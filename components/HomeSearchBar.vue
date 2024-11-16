<template>
  <div class="relative h-[76px] w-[710px] items-center">
    <Input
      id="search"
      type="text"
      placeholder="Find the perfect sound effect..."
      class="size-full rounded-none border-muted-foreground pl-6 pr-20 text-xl"
    />
    <span
      class="absolute inset-y-0 end-0 flex items-center justify-center px-6"
    >
      <Icon
        name="mdi:magnify"
        class="size-10 text-muted-foreground"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import { Input } from "@/components/ui/input";
</script>
