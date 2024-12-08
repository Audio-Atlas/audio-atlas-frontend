<template>
  <article class="flex w-full max-w-3xl flex-col items-center py-12">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      About
    </h1>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
      Audio Atlas is a fuzzy search tool for sound effects. It takes in text
      query and returns a list of sound effects that match the query. The core
      of Audio Atlas is the
      <NuxtLink
        external
        to="https://github.com/LAION-AI/CLAP"
        class="font-medium text-primary underline underline-offset-4"
      >
        CLAP (Contrastive Language-Audio Pretraining)
      </NuxtLink>
      model made by LAION-AI.
    </p>
    <h2
      class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
      How does it work?
    </h2>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
      Here's a simple diagram to explain how Audio Atlas works:
    </p>
    <div class="mt-6 flex h-[512px] items-center justify-center">
      <img
        src="/imgs/diagram.png"
        alt="Diagram of how Audio Atlas works"
        class="h-full rounded-lg"
      />
    </div>
    <h3 class="mt-10 scroll-m-20 text-2xl font-semibold tracking-tight">
      Preprocessing
    </h3>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
      Audio Atlas preprocesses the existing sound effects data by saving the
      sound data in a format that is easy to search through. The sound data is
      then converted into vector embeddings using CLAP's Audio Encoder.
    </p>

    <h3 class="mt-10 scroll-m-20 text-2xl font-semibold tracking-tight">
      Query
    </h3>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
      When a user enters a query, Audio Atlas preprocesses the query and
      converts it into a vector embedding using CLAP's Text Encoder which has
      the same dimension as the sound embeddings. It is then compared with the
      sound embeddings to find the most similar sound effects.
    </p>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
      The sound effects are then ranked based on their similarity to the query
      and passed through a pagination algorithm to return the most relevant
      sound effects.
    </p>

    <h3 class="mt-10 scroll-m-20 text-2xl font-semibold tracking-tight">
      Download
    </h3>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
      When a user clicks on a sound effect, Audio Atlas fetches the sound effect
      from the server based on its ID and plays it for the user. The user can
      then download the sound effect if they like it.
    </p>

    <h2
      class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
      Technologies Used
    </h2>
    <p class="leading-7 [&:not(:first-child)]:mt-6">
      Audio Atlas is built using the following technologies:
      <ul class="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>Frontend: <NuxtLink
        external
        to="https://nuxt.com/"
        class="font-medium text-primary underline underline-offset-4"
      >
        Nuxt (Vue)
      </NuxtLink></li>
        <li>Backend: <NuxtLink
        external
        to="https://python-poetry.org/"
        class="font-medium text-primary underline underline-offset-4"
      >
        Poetry
      </NuxtLink> and <NuxtLink
        external
        to="https://palletsprojects.com/projects/flask/"
        class="font-medium text-primary underline underline-offset-4"
      >
        Flask
      </NuxtLink></li>
      </ul>
    </p>
  </article>
</template>
