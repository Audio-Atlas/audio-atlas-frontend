<template>
  <div class="flex w-[120px] items-center justify-between">
    <LinkButton>
      <!-- TODO: change to actual url -->
      <NuxtLink to="https://example.com">
        <Icon name="proicons:github" class="size-8" />
      </NuxtLink>
    </LinkButton>
    <LinkButton>
      <NuxtLink to="/about">
        <Icon name="mdi:information-outline" class="size-8" />
      </NuxtLink>
    </LinkButton>
  </div>
</template>
