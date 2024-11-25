<script setup lang="ts">
  const route = useRoute();
  const query = ref(route.query.q as string || "");

  watch(() => route.query.q, (search) => {
    query.value = search as string;
  });
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center"> 
    <div
      class="absolute top-0 flex w-full items-center justify-between px-8 pt-6"
    >
      <div>
        <span class="text-2xl">Audio Atlas</span>
      </div>
      <Transition name="fade-up-in">
        <QuerySearchBar v-if="query" :query="query" />
      </Transition>
      <LinkButtonGroup />
    </div>
    <HomeLogo />
    <Transition name="fade-up-out">
      <HomeSearchBar v-if="!query" :query="query" />
    </Transition>
  </div>
</template>


<style scoped>
    div{
       --delay: 0.5s;
    }
    .fade-up-in-enter-active{
        transition: all var(--delay) ease-out;
        transition-delay: calc(var(--delay) * 0.5);
    }
    .fade-up-in-leave-active {
        transition: all var(--delay) ease-out;
    }
    .fade-up-in-enter-from, .fade-up-in-leave-to{
        opacity: 0;
        transform: translateY(20px);
    }
    .fade-up-in-enter-to, .fade-up-in-leave-from{
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
    .fade-up-out-enter-from, .fade-up-out-leave-to{
        opacity: 0;
        transform: translateY(-20px);
    }
    .fade-up-out-enter-to, .fade-up-out-leave-from{
        opacity: 1;
        transform: translateY(0px);
    }

</style>