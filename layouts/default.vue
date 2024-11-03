<template>
  <div class="flex h-full flex-col items-center justify-center">
    <nav class="space-x-2">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
    </nav>
    <div>
      <slot />
    </div>
  </div>
</template>
