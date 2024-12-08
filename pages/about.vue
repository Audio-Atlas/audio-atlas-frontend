<template>
  <div class="flex w-full flex-col items-center justify-center">
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
      <LinkButtonGroup />
    </div>
    <div
      class="relative flex h-[calc(100vh-60px)] w-full flex-col items-center"
    >
      <AboutArticle />
    </div>
  </div>
</template>
