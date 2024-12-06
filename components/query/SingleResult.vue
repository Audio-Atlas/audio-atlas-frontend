<script setup lang="ts">
import { millisecondsToSeconds, downloadAudioClip } from '~/aa-util';
  const props = defineProps<{
    audioId: string;
    name: string;
    duration: number;
    similarity: number;
    playingClip: boolean;
    onSetPlaying: (audioId: string | null) => void;
  }>();

  const onDownloadClip = (format: 'mp3' | 'wav') => {
    downloadAudioClip(props.audioId, format);
  };
</script>

<template>
  <div class="flex h-[133px] w-full border px-6 py-4">
    <div class="flex items-center gap-4">
      <button @click="onSetPlaying(playingClip ? null : props.audioId)">
        <Icon
          :name="playingClip ? 'mdi:pause-circle-outline' : 'mdi:play-circle-outline'"
          :class="'size-20 pointer mr-4 hover:text-primary ' + (playingClip ? 'text-primary' : 'text-muted-foreground')"
        />
    </button>
    </div>
    <div>
      <h3 class="w-1/2 truncate text-lg font-bold">
        {{ props.name }}
      </h3>
      <p class=" text-sm">
        {{ millisecondsToSeconds(props.duration) }}s
      </p>
      <p class="text-sm">
        {{ props.similarity }}% match
      </p>
    </div>
    <div class="ml-auto flex items-center gap-4">
      <button
        class="border-white py-4 px-6 text-primary border"
        @click="() => onDownloadClip('mp3')"
      >
        <p>Mp3</p>
      </button>
      <button
        class="border-white py-4 px-6 text-primary border"
        @click="() => onDownloadClip('wav')"
      >
        <p>Wav</p>
      </button>
    </div>
  </div>
</template>
