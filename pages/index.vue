<script setup lang="ts">
const route = useRoute();
const query = ref((route.query.q as string) || "");

watch(
  () => route.query.q,
  (search) => {
    query.value = search as string;
  },
);
</script>

<template>
  <div
    class="flex size-full flex-col items-center justify-start overflow-y-auto"
  >
    <div
      class="sticky top-0 z-50 flex h-[60px] w-full items-center justify-between px-8 pt-6 backdrop-blur"
    >
      <div>
        <NuxtLink
          class="flex cursor-pointer flex-row flex-nowrap items-center justify-start"
          to="/"
        >
          <img
            src="/imgs/AALogo.png"
            alt="Audio Atlas Logo"
            class="size-10 object-contain"
          />

          <span class="ml-2 text-2xl font-semibold">Audio Atlas</span>
        </NuxtLink>
      </div>
      <Transition name="fade-up-in">
        <QuerySearchBar v-if="query" :query="query" />
      </Transition>
      <LinkButtonGroup />
    </div>
    <div class="relative flex size-full flex-col items-center">
      <Transition name="fade-up-out">
        <div v-if="!query" class="fixed top-[30vh] flex flex-col">
          <h1 class="mb-10 text-center text-4xl font-semibold">
            Search for the perfect sound effect...
          </h1>
          <HomeSearchBar />
          <div class="mt-2 flex items-center justify-end">
            <NuxtLink to="/about" class="text-blue-300 underline">
              How does this work?
            </NuxtLink>
          </div>
        </div>
      </Transition>
      <Transition name="fade-up-in">
        <QuerySearchResultsList v-if="query" :query="query" />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
div {
  --delay: 0.5s;
}
.fade-up-in-enter-active {
  transition: all var(--delay) ease-out;
  transition-delay: calc(var(--delay) * 0.5);
}
.fade-up-in-leave-active {
  transition: all var(--delay) ease-out;
}
.fade-up-in-enter-from,
.fade-up-in-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-up-in-enter-to,
.fade-up-in-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

.fade-up-out-enter-active {
  transition: all var(--delay) ease-out;
  transition-delay: calc(var(--delay) * 0.5);
}
.fade-up-out-leave-active {
  transition: all var(--delay) ease-out;
}
.fade-up-out-enter-from,
.fade-up-out-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.fade-up-out-enter-to,
.fade-up-out-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
