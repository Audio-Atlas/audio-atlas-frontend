<template>
  <Button variant="ghost" size="icon" as-child class="hover:bg-primary/40">
    <slot />
  </Button>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>
